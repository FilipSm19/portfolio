"use client";

import { useEffect, useRef, useState } from "react";

interface ObserverOptions {
    rootMargin?: string;
    group?: string;
}

const DEVICE_HAS_CURSOR = "(hover: hover) and (pointer: fine)"; // Media query string if device supports precise pointers and hover

const groups = new Map<string, Set<(active: boolean) => void>>(); // groups -> (group Name & Set of functions), Set of function where function(active) and is void, active must be bool.
function getGroupSet(group: string) {
    if (!groups.has(group)) {
        // If group doesn't exist, create it and add new Set
        groups.set(group, new Set());
    }

    return groups.get(group)!;
}

export function useActiveObserver<T extends HTMLElement = HTMLElement>(
    options: ObserverOptions = {}
) {
    const { rootMargin = "-30% 0px -65% 0px", group = "default" } = options;

    const [isActive, setIsActive] = useState(false);  // Defining state for sending to HTML element 
    const elementRef = useRef<T | null>(null); // Defining element reference of observed element 
    // (it can be HTMLDiv,Ulist,il, etc.. so we put T for flexibility or null is no element, null is default) | IF T is not defined look at  <T extends HTMLElement = HTMLElement>

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const deviceHasCursor = window.matchMedia(DEVICE_HAS_CURSOR); // Check if device has cursor (desktop device)

        const groupSet = getGroupSet(group); // Getting or creating new group set through function for group

        let observer: IntersectionObserver | null = null; // Creates "observer" variable which equals to NULL and can be IntersectionObserver as well.

        // Function - Setup:
        // - Disconnects and sets observer to null (reset)
        // - If device has cursor set element state to false & abort setup
        // - Add set active function for current element in group set
        // - Attach new observer to "observer" variable & observe the current element
        const setup = () => {
            observer?.disconnect();
            observer = null;

            if (deviceHasCursor.matches) {
                setIsActive(false); // Sets data-active = false in HTML
                groupSet.delete(setIsActive); // Removes group set entirely for specific element
                return;
            }

            groupSet.add(setIsActive);

            observer = new IntersectionObserver(
                ([entry]) => handleObserverTrigger(entry.isIntersecting), // CALLBACK FUNCTION ->
                { rootMargin } // OPTIONS -> {rootMargin: rootMargin}, simplified
            );
            observer.observe(element);
        };

        // Function - Handle Observer Trigger Events:
        // - When triggered: deactivates other elements in the group, then activates the current one.
        // - When not triggered: deactivates the current element. 
        const handleObserverTrigger = (triggered: boolean) => {
            if (triggered) {
                groupSet.forEach((setter) => {
                    if (setter !== setIsActive) setter(false);
                });
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        // Start setup - function call
        setup();

        // If devices interaction type changes call setup function again
        deviceHasCursor.addEventListener("change", setup);

        return () => {
            observer?.disconnect();
            deviceHasCursor.removeEventListener("change", setup);
            groupSet.delete(setIsActive);
        };
    }, [rootMargin, group]);

    return { elementRef, isActive };
}