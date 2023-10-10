function createCropCard(crop){
     const containerDiv = document.createElement("div");
     containerDiv.classList.add("border", "rounded", "p-2", "bg-light");
     containerDiv.style.width = "180px";

     const img = document.createElement("img");
     img.src = "/images/apple1.png";
     img.alt = "";
     img.classList.add("w-100");

     const nameParagraph = document.createElement("p");
     nameParagraph.classList.add("m-0", "fs-nsm", "text-center", "fw-bold");
     const nameSpan = document.createElement("span");
     nameSpan.textContent = crop;
     nameParagraph.appendChild(nameSpan);

     const priceParagraph = document.createElement("p");
     priceParagraph.classList.add("m-0", "fs-nsm");
     priceParagraph.innerHTML = "Market price: <span class='text-success fw-bold'>Rs.230</span>";

     const demandSupplyDiv = document.createElement("div");
     demandSupplyDiv.classList.add("text-center");
     const demandParagraph = document.createElement("p");
     demandParagraph.classList.add("m-0", "fs-nsm");
     demandParagraph.innerHTML = "Demand: <span class='text-danger fw-bold'>Low</span>";
     const supplyParagraph = document.createElement("p");
     supplyParagraph.classList.add("m-0", "fs-nsm");
     supplyParagraph.innerHTML = "Supply: <span class='fw-bold text-success'>High</span>";
     demandSupplyDiv.appendChild(demandParagraph);
     demandSupplyDiv.appendChild(supplyParagraph);

     const buttonDiv = document.createElement("div");
     buttonDiv.classList.add("my-2", "d-flex", "align-items-center", "justify-content-center", "gap-2");

     const procedureButton = document.createElement("button");
     procedureButton.classList.add("fs-nsm", "border-0", "text-white", "bg-secondary", "rounded", "px-2", "py-1");
     procedureButton.textContent = "Procedure";

     const trackButton = document.createElement("button");
     trackButton.classList.add("fs-nsm", "border-0", "text-white", "bg-success", "rounded", "px-2", "py-1");
     trackButton.dataset.id = "23u89348793298";
     trackButton.textContent = "Track";

     containerDiv.appendChild(img);
     containerDiv.appendChild(nameParagraph);
     containerDiv.appendChild(priceParagraph);
     containerDiv.appendChild(demandSupplyDiv);
     buttonDiv.appendChild(procedureButton);
     buttonDiv.appendChild(trackButton);
     containerDiv.appendChild(buttonDiv);
     return containerDiv
}

export default createCropCard