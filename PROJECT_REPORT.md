# ArkAuto Development Report & Data Strategy

## 1. Project Status Overview

**ArkAuto** is a modern, high-performance automotive e-commerce platform built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. The application has reached a stable production-ready state with a focus on speed, reliability, and precision data handling.

### Key Achievements
- **Deployment Ready**: The codebase is fully linted, type-checked, and successfully built for production.
- **Performance Optimization**: 
  - Implemented **Lazy Initialization** for all global contexts (`Cart`, `Order`, `Product`, `Wishlist`) to prevent unnecessary re-renders.
  - Used `useMemo` and `useCallback` hooks extensively to ensure UI responsiveness.
- **Git Integration**: The project is version-controlled on GitHub (`support-Achtrex/arkauto`) with a clean `main` branch ready for CI/CD pipelines (e.g., Railway, Vercel).

---

## 2. Data Mapping Architecture

The core value of ArkAuto lies in its ability to accurately match vehicles to parts. We have implemented a three-tiered data mapping strategy:

### A. OEM (Original Equipment Manufacturer) Mapping
**Implementation**: `src/data/products.ts`
- **Structure**: Every product in the database contains specific fields for accurate matching:
  - `oemNumber`: The official manufacturer part number (e.g., `A0034202520`).
  - `altNumbers`: A list of interchangeable aftermarket numbers (e.g., `D872`, `7747`).
  - `compatibility`: An array of vehicle makes (e.g., `["MERCEDES-BENZ", "VOLKSWAGEN"]`).
- **Logic**: When a user searches or filters, the system scans both `oemNumber` and `altNumbers`. This ensures that even if a user searches for a generic aftermarket code, the correct OEM-compatible part is found.

### B. VIN (Vehicle Identification Number) Decoding
**Implementation**: `src/app/(shop)/vin-lookup/page.tsx` & `src/data/wmi.ts`
We use a **Hybrid Decoding Strategy** to ensure global coverage:

1.  **Primary Layer (API)**: 
    - The system first queries the **NHTSA vPIC API**.
    - This provides detailed build data (Engine Cylinders, Displacement, Fuel Type, Transmission) for US-market and many global vehicles.
    
2.  **Secondary Layer (Heuristic Fallback)**:
    - Many international vehicles (JDM, Euro-spec) do not exist in the US NHTSA database.
    - We implemented a **WMI (World Manufacturer Identifier)** lookup system.
    - The system extracts the first 3 characters of the VIN (e.g., `JHM`) and maps them against our local `wmi.ts` database.
    - **Result**: Even if the API fails, ArkAuto can identify "Honda (Japan)" or "Volkswagen (Germany)" and serve the correct regional catalog.

### C. YMM (Year, Make, Model) Hierarchy
**Implementation**: `src/components/features/VehicleSelector.tsx` & `src/data/vehicleData.ts`
- **Structured Data**: Vehicles are organized by **Region** (Asia, EU, US) -> **Make** -> **Model**.
- **Constraint-Based Selection**: The UI forces a valid path. You cannot select a "BMW" model if you first selected "Toyota". This prevents user error and ensures database queries always return valid results to the `catalog` page.

---

## 3. Strategy for Continuous Training & Accuracy

To move from a static database to a "smart" system that improves over time, we recommend the following **Continuous Improvement Loop**:

### Phase 1: Data Collection (The "Ears")
1.  **Failed Search Logging**:
    - Create a database table `failed_decodes` to log any VIN that returns "Unknown" from both API and WMI fallback.
    - Log every "No Results Found" search query in the Catalog.
2.  **User Feedback Loop**:
    - Implement a "Report Incorrect Fitment" button on the Product Page.
    - When a user returns an item with reason "Did Not Fit", flag that `(Product ID + Vehicle ID)` combination for review.

### Phase 2: Data Enrichment (The "Brain")
1.  **Automated Scrapers**:
    - Write scripts (Python/Node) to periodically iterate through `failed_decodes`.
    - Query alternative regional APIs (e.g., European EOBD, Japanese databases) to fill in the missing gaps for those VINs.
    - Automatically update `wmi.ts` and `vehicleData.ts` with these new findings.
2.  **Compatibility Scoring**:
    - Assign a **Confidence Score** (0-100%) to vehicle-part matches.
    - *Base Score*: 80% (based on static catalog data).
    - *Purchase Validation*: +5% for every successful purchase (no return).
    - *Return Penalty*: -20% for every "Did Not Fit" return.
    - If a score drops below 40%, automatically flag the part for manual review or hide it from that vehicle's search results.

### Phase 3: AI/ML Integration (The Future)
1.  **Predictive Fitment**:
    - Train a model on `(Vehicle Specs) + (Part Specs) -> Fit/NoFit`.
    - Use this to predict compatibility for **new** parts where explicit mapping doesn't exist yet (e.g., "This water pump fits a 2.0L engine; this new car has the same 2.0L engine code, so it likely fits").

## 4. Summary of Work Done
- **Frontend**: Complete, responsive, and aesthetically polished (Dark/Light mode accents, glassmorphism).
- **Backend Logic**: Robust Context API for state management, secure routing.
- **DevOps**: Clean Git history, verified Production Build (`npm run build`), ready for Railway/Vercel deployment.

**ArkAuto is ready for launch.**
