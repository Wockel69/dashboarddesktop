"use client";

import React, { useEffect } from 'react';

/**
 * This component helps handle Browser Isolation System (BIS) extension attributes
 * that cause React hydration errors by cleaning them up after hydration.
 */
export function BisSkinFix() {
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    // Function to remove BIS attributes recursively
    const removeBisAttributes = (node: Element) => {
      // Remove BIS attributes from the current node
      if (node instanceof Element) {
        // Remove bis_skin_checked attributes
        if (node.hasAttribute('bis_skin_checked')) {
          node.removeAttribute('bis_skin_checked');
        }

        // Process child nodes
        Array.from(node.children).forEach(removeBisAttributes);
      }
    };

    // Run the fix immediately after hydration completes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          Array.from(mutation.addedNodes).forEach((node) => {
            if (node instanceof Element) {
              removeBisAttributes(node);
            }
          });
        }
      });
    });

    // Start observing the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked']
    });

    // Initial cleanup
    removeBisAttributes(document.body);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * This higher-order component ensures its children are only rendered client-side
 * and adds additional attributes that prevent hydration mismatches with BIS.
 */
export function BisCompatibleDiv({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div
      className={className}
      suppressHydrationWarning
      data-bis-exempt="true"
    >
      {children}
    </div>
  );
}

/**
 * A more comprehensive hydration barrier that ensures components only render client-side
 * and with compatibility for browser extensions like BIS
 */
export function HydrationBarrier({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning data-bis-exempt="true">
      {children}
    </div>
  );
}
