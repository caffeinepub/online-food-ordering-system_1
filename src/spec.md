# Specification

## Summary
**Goal:** Improve the Customer Portal by adding dish images with a click-to-enlarge modal in Step 1, and ensure order tracking resets and progresses correctly for each new order.

**Planned changes:**
- Add static dish images (Pizza, Burger, Biryani) under `frontend/public/assets/generated` and render them on each corresponding menu card in Customer Portal Step 1 with appropriate English alt text.
- Make dish images clickable in Step 1 to open a dismissible modal showing a larger version of the selected dish image, while keeping “Add to Cart” behavior unchanged.
- Update Customer Portal order tracking so each newly placed order starts at “Order Received” and progresses in sequence to “Delivered” for the most recent order only, with proper timer cleanup to avoid React warnings.

**User-visible outcome:** In Step 1, customers see images for Pizza, Burger, and Biryani and can click them to view a larger version in a modal; when an order is placed, Step 4 reliably starts at “Order Received” and advances through the correct statuses, and placing another order restarts tracking cleanly.
