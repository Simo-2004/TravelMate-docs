\# System Testing \& Quality Assurance



> \*\*Methodological Note:\*\* Following the Waterfall lifecycle and the principles of the \*\*V-Model\*\*, the Integration and System Testing phase was initiated strictly upon reaching the \*Code Freeze\* milestone. The testing process involved an initial baseline analysis followed by targeted resolutions, validating the fully developed software against the frozen design specifications to ensure code quality, security, and stability before the final Release (Deployment) phase.



\## 1. Initial Analysis (Baseline)

Upon integrating the modules, a first static code analysis was performed using \*\*SonarCloud\*\*. This initial test served to identify any baseline issues, technical debt, or minor anomalies introduced during the coding phase.



\### 1.1 Overview and Quality Gate (Pre-Test)

The first scan provided a general overview of the system's health, highlighting the areas that required immediate attention before the software could be deemed production-ready.



<img src="/static/pics/sonar-pre-test1.png" alt="SonarCloud Overview - Before" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />



\### 1.2 Detailed Issues and Maintainability (Pre-Test)

A deeper look into the codebase revealed specific areas for improvement, such as code smells or minor reliability issues, which needed to be addressed to meet the strict standards defined in our design phase.



<img src="/static/pics/sonar-pre-test2.png" alt="SonarCloud Issues - Before" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />



\## 2. Resolution and Final Verification

In strict accordance with the \*\*V-Model\*\* iterative correction principle, the anomalies detected during the initial verification were traced back to their respective modules and resolved. A subsequent analysis was then executed to confirm the effectiveness of the interventions.



\### 2.1 Final Quality Gate (After-Test)

Following the targeted fixes, the system successfully passed the defined Quality Gate. The metrics confirm that the code now fully meets the required standards for a production release.



<img src="/static/pics/sonar-after-test-1.png" alt="SonarCloud Overview - After" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />



\### 2.2 Security, Reliability, and Zero Technical Debt (After-Test)

The final analysis confirms that the local-first architecture (Release 1.0) is secure, stable, and highly maintainable:

\* \*\*Vulnerabilities:\*\* 0

\* \*\*Bugs:\*\* 0

\* \*\*Code Smells:\*\* Resolved and kept strictly below the accepted threshold.



<img src="/static/pics/sonar-after-test-2.png" alt="SonarCloud Issues - After" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />



\## 3. Testing Phase Conclusion

The comparative SonarCloud system test thoroughly validates the structural integrity of the application. Having successfully remediated the initial findings and passed the final verification, the product is officially deemed ready for the final step of the Waterfall model: the \*\*Deployment\*\* of the executable APK.

