"use client";

import { useEffect, useRef, useState } from "react";

const ROOTMARGIN = "-32% 0px -65% 0px";
const DEVICE_HAS_CURSOR = "(hover: hover) and (pointer: fine)";

// Define callbacks map for elements 
type IntersectionCallback = (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
const callbacks = new Map<Element, IntersectionCallback>();

// Define observer
let observer: IntersectionObserver | null = null;

// Define groups
const groups = new Map<string, Set<(active: boolean) => void>>();

function createObserver() {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const callback = callbacks.get(entry.target);

            if (callback) {
                callback(entry.isIntersecting, entry);
            }
        })
    }, { rootMargin: ROOTMARGIN });
}


// Observe element function
// If no observer create it
function observeElement(element: Element | null = null, callback: IntersectionCallback) {
    if (!element) return;

    callbacks.set(element, callback);

    if (!observer) {
        observer = createObserver();
    }

    observer.observe(element);
}

// Unobserve element function & if no callbacks disconnect it and set to null
function unobserveElement(element: Element | null = null) {
    if (!element) return;

    callbacks.delete(element);

    if (observer) observer.unobserve(element);

    if (callbacks.size === 0) {
        observer?.disconnect();
        observer = null;
    }
}
function getGroupSet(group: string) {
    if (!groups.has(group)) {
        // If group doesn't exist, create it and add new Set
        groups.set(group, new Set());
    }

    return groups.get(group)!;
}


export function useNoCursorObserver<T extends HTMLElement = HTMLElement>(group: string = "default") {
    const elementRef = useRef<T | null>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        const deviceHasCursor = window.matchMedia(DEVICE_HAS_CURSOR);

        const groupSet = getGroupSet(group);

        if (!element) return;

        function setup() {
            if (deviceHasCursor.matches) {
                setIsActive(false);
                if (observer) {
                    unobserveElement(element);
                }
                groupSet?.delete(setIsActive);
                return;
            }
            groupSet.add(setIsActive);
            observeElement(element, (isIntersecting) => {
                if (isIntersecting) {
                    groupSet.forEach((setter) => {
                        if (setter !== setIsActive) setter(false);
                    });
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            });
        }

        setup();
        deviceHasCursor.addEventListener("change", setup);

        return () => {
            if (observer) {
                unobserveElement(element);
            }

            deviceHasCursor.removeEventListener("change", setup);
            groupSet.delete(setIsActive);
        };

    }, [group]);

    return { elementRef, isActive };
}


