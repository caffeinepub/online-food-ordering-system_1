# Specification

## Summary
**Goal:** Replace emoji-only dish tiles in the Customer Portal menu with real local images, and allow tapping an image to view a larger version in a dismissible modal without affecting ordering.

**Planned changes:**
- Add six local static dish images (Pizza, Burger, Biryani, Pasta, Sandwich, Noodles) and render them in the Customer Portal “Food Menu” grid in place of emojis.
- Update `sampleMenuItems` in `frontend/src/pages/CustomerPortal.tsx` to include an image filename/path per dish and render `<img>` with English alt text matching each dish name.
- Make dish images clickable to open a modal/popup showing a larger version of the same image, with clear dismissal and proper focus return, while preserving existing “Order Now” button behavior and toast feedback.

**User-visible outcome:** The Customer Portal menu shows real dish photos; users can click/tap a dish image to see a larger view in a modal and can still use “Order Now” exactly as before.
