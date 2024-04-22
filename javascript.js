function searchStudents() {
    var input = document.getElementById("searchInput").value;
    
    // Load the XML document
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayStudents(this.responseXML, input);
        }
    };
    xhttp.open("GET", "students.xml", true);
    xhttp.send();
}

function displayStudents(xmlDoc, input) {
    var studentListDiv = document.getElementById("studentList");
    studentListDiv.innerHTML = ""; // Clear previous results
    
    var xpathExpr = "//filiere[@nom='" + input + "']/etudiant";
    var students = xmlDoc.evaluate(xpathExpr, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0; i < students.snapshotLength; i++) {
        var student = students.snapshotItem(i);
        var nom = student.querySelector("nom").textContent;
        var prenom = student.querySelector("prenom").textContent;
        var photo = student.querySelector("photo").textContent;

        // Create elements to display student information
        var studentDiv = document.createElement("div");
        studentDiv.innerHTML = "<img src='" + photo + "' alt='Student Photo'>" +
            "<p>Name: " + nom + " " + prenom + "</p>";
        studentListDiv.appendChild(studentDiv);
    }
}
