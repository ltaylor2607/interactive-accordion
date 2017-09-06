getData();

function getData() {
    let http = new XMLHttpRequest();
    let objList;
    http.open('GET', 'http://design.propcom.co.uk/buildtest/accordion-data.json', true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            let obj = JSON.parse(http.responseText);
            objList = obj.blocks;
            createBlocks(objList);
        }
    };
    http.send(null);
}

function createBlocks(blocks) {
    let article = document.getElementById('article');
    for (let i=0; i < blocks.length; i++) {
        //create heading
        let section = document.createElement('section');
        section.classList.add('section');
        let headerDiv = document.createElement('div');
        headerDiv.classList.add('item-header');
        let heading = document.createElement('h2');
        heading.innerHTML = blocks[i].heading;
        headerDiv.appendChild(heading);
        let arrow = document.createElement('p');
        arrow.innerHTML = '&#709;';
        headerDiv.appendChild(arrow);
        section.appendChild(headerDiv);
        
        //create content
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('item-content');
        contentDiv.classList.add('hidden');
        let content = document.createElement('p');
        content.innerHTML = blocks[i].content;
        contentDiv.appendChild(content);
        section.appendChild(contentDiv);
        
        //add section to article
        article.appendChild(section);
    }
}

document.querySelector('#article').addEventListener('click', clickHeader);

function clickHeader(e) {
    //remove all active classes
    let items = document.querySelectorAll('.active');
    [].forEach.call(items, function(el) {
       el.className = el.className.replace(/\bactive\b/, ""); 
    });
    //add active class to the correct header element
    if (e.target.classList.contains('item-header') || e.target.parentElement.classList.contains('item-header')) {
        let target = e.target;
        target.closest('.item-header').classList.toggle('active');

        let arrow = target.closest('.item-header').querySelector('p');

        //show the content
        let content = target.closest('.section').querySelector('.item-content');
        if (!content.classList.contains('hidden')) {
            hideAllContents();
        } else {
            hideAllContents();
            content.className = content.className.replace(/\bhidden\b/, "");
            arrow.innerHTML = "&#708;";
        }
    }
}

function hideAllContents() {
    let contents = document.querySelectorAll('.item-content');
    [].forEach.call(contents, function(el) {
       if (!el.classList.contains('hidden')) {
           hideContent(el);
       }
    });
}

function hideContent(el) {
    el.classList.add('hidden');
    let header = el.closest('.section').querySelector('.item-header');
    header.className = header.className.replace(/\bactive\b/, "");
   let arrow = header.querySelector('p');
   arrow.innerHTML = "&#709;";
}