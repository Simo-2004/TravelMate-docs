# Feasibility Study: TravelMate



## 1. Objectives and Scope of the Document

This document represents the first formal step within the Waterfall software lifecycle adopted for the TravelMate project. The main objective of this feasibility study is to determine whether to initiate the project[cite: 1, 2]. To this end, the document provides a preliminary assessment of costs and benefits, identifies the most appropriate design options, and estimates the necessary human and financial resources[cite: 1, 2].



## 2. Preliminary Definition of the Problem

As required by the methodological specifications, the initial output of this phase is the preliminary definition of the problem[cite: 1, 2]. 

The need arises from a real issue: solo travelers or small groups face increasing difficulties in finding travel companions who are compatible in terms of budget, interests, age group, and travel style. Currently, generic social platforms do not offer targeted matching tools, making the search inefficient and raising critical issues related to safety and reliability. The problem therefore requires a dedicated, structured, and secure software solution acting as a closed ecosystem for travelers.



## 3. Scenarios and Design Options

To address the outlined problem, various alternative scenarios and design options have been identified and analyzed[cite: 1, 2], leading to the following architectural decisions for Release 1.0:

*   **Development Technology:** The **Flutter** framework was chosen for front-end development. This option ensures cross-platform deployment (iOS/Android) while maintaining a single codebase, drastically optimizing development time and the human resources available.

*   **Architecture and Data:** Evaluating the cost/benefit ratio[cite: 1, 2], an initial *local-first* architecture based on local persistence (via `SharedPreferences`) was chosen. This strategy allows the application's ecosystem to be validated while completely eliminating the financial costs associated with maintaining server infrastructure or remote cloud databases.

*   **Visual Design:** **Figma** was used for UI/UX prototyping, allowing the user experience to be defined in advance to avoid costly rework during the subsequent phases of the Waterfall model.

<iframe src="/docs/static/pics/homepage.svg" width="440px" height="935px" style="border: 1px solid #dddddd; border-radius: 30px;"></iframe>


## 4. Time and Resource Estimation (Gantt Chart)

Below is the estimation of the development time and working modalities required for the project[cite: 1, 2]. The planning strictly follows the Waterfall Model: activities are grouped into homogeneous phases[cite: 1, 2] and organized into sequential Work Packages (WP) spread over a 14-week timeframe (S01-S14).



> *Methodological Note: The strictly diagonal trend and the absence of backward overlaps (X) highlight the formal adoption of the sequential lifecycle. Each WP begins only upon completion of the previous phase, whose deliverables are officially frozen so as not to be modifiable, unless a formal review process is triggered[cite: 1, 2].*



## 5. Visual Mock-up

To support the design choices and tangibly assess the feasibility of the solution, a comprehensive graphic document was developed. Attached below is the PDF generated via Figma, which serves as a visual guideline for the product's implementation.



<iframe src="/docs/static/pics/diagramma-di-gantt.png" width="100%" height="450px" style="border: 1px solid #ddd; border-radius: 7px;"></iframe>



*(If you cannot view the frame correctly, you can download the full document [by clicking here](/docs/static/pics/diagramma-di-gantt.png).*



## 6. Final Evaluation and Conclusion

The overall analysis produced a clearly positive preliminary assessment of costs and benefits[cite: 1, 2]. The use of a local architecture and a *cross-platform* framework allows development costs to be kept within the predefined (zero) budget and timeframe (14 weeks), while ensuring a high quality standard. 



**Decision:** The Feasibility Study is approved. The formal start of the project and the transition to the next **Requirements Analysis (RAD)** phase for drafting formal specifications are hereby authorized.

