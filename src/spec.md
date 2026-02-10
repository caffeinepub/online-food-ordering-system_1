# Specification

## Summary
**Goal:** Refactor the existing Customer ordering experience (/customer) into a strict single-step flow: Menu → Cart → Delivery Details → Order Tracking, with only one step visible at a time.

**Planned changes:**
- Update the /customer route to default to Step 1 (Restaurant & Menu) and enforce that exactly one step’s content renders at any time.
- Implement Step 1 view with one restaurant name and exactly three menu items (Pizza 199, Burger 129, Biryani 249) with “Add to Cart”; show “Go to Cart” only after at least one item is added.
- Implement Step 2 Cart view showing selected items only, quantity per item, total price, and buttons for “Continue Shopping” (back to Step 1) and “Proceed to Details” (to Step 3).
- Implement Step 3 Delivery Details view with a form (Name, Phone Number, Delivery Address) and “Place Order” that transitions to Step 4.
- Implement Step 4 Order Tracking view that displays only the current status and auto-advances through: Order Received → Preparing → Out for Delivery → Delivered; show a clear message if no active order exists.
- Add a simple progress indicator (e.g., Step X/4) that does not reveal other step content and keep navigation smooth and mobile-friendly.
- Update About Project page copy to exactly: “This is a frontend prototype of an Online Food Ordering System developed using a no-code website builder. Backend and database operations are explained conceptually.”
- Update the Footer to include exactly: “College Mini Project – Online Food Ordering System” and “Thank You”.

**User-visible outcome:** Users can start at /customer and complete a guided, single-step-at-a-time ordering flow from menu selection through tracking, and will see updated About and Footer text.
