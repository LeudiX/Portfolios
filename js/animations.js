
const procedures = [
    {
        title: "Step 1: Check Eligibility",
        description: "Check if you meet the eligibility criteria for an Open Work Permit in Computer Sciences",
        svgAnimation: "eligibility-check"
    },
    {
        title: "Step 2: Gather Documents",
        description: "Gather all required documents, including your resume, education certificates, and language proficiency test results",
        svgAnimation: "document-gathering"
    }
];

const eligibilityCheckAnimation = () => {
    // create a circle element
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", "20");
    circle.setAttribute("fill", "blue");
    document.getElementById("svg-container").appendChild(circle);

    // animate the circle
    setTimeout(() => {
        circle.setAttribute("cx", "70%");
    }, 1000);
    setTimeout(() => {
        circle.setAttribute("cx", "30%");
    }, 2000);
};

// document-gathering animation
const documentGatheringAnimation = () => {
    // create a rectangle element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "10");
    rect.setAttribute("y", "10");
    rect.setAttribute("width", "50");
    rect.setAttribute("height", "20");
    rect.setAttribute("fill", "green");
    document.getElementById("svg-container").appendChild(rect);

    // animate the rectangle
    setTimeout(() => {
        rect.setAttribute("x", "20");
    }, 1000);
    setTimeout(() => {
        rect.setAttribute("x", "10");
    }, 2000);
};


//Step 4: 
const svgContainer = document.getElementById("svg-container");

setInterval(() => {
    // iterate through the procedures array
    procedures.forEach((procedure) => {
        // execute the procedure
        console.log(`Executing procedure: ${procedure.title}`);

        // execute the corresponding animation
        if (procedure.svgAnimation === "eligibility-check") {
            eligibilityCheckAnimation();
            svgContainer.innerHTML = "";
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "50%");
            circle.setAttribute("cy", "50%");
            circle.setAttribute("r", "20");
            circle.setAttribute("fill", "blue");
            svgContainer.appendChild(circle);
        } else if (procedure.svgAnimation === "document-gathering") {
            documentGatheringAnimation();
            svgContainer.innerHTML = "";
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", "10");
            rect.setAttribute("y", "10");
            rect.setAttribute("width", "50");
            rect.setAttribute("height", "20");
            rect.setAttribute("fill", "green");
            svgContainer.appendChild(rect);
        }
    });
}, 300000); // 5 minutes