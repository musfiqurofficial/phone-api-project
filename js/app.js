const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // display 10 phone 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    // display all phone
    const noPhone = document.getElementById('alartMess');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none')
    }
    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col-md-3');
        phoneDiv.innerHTML = `
        <div class="card" style="max-height: 400px ">
            <img src="${phone.image}" class="card-img-top p-3 w-75 rounded mx-auto d-block" alt="...">
            <div class="card-body overflow-hidden">
                <h5 class="card-title">${phone.phone_name.toUpperCase()}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);

}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)

}

document.getElementById('button-addon2').addEventListener('click', function () {
    // start loader 
    processSearch(10);
})

// search input field enter even hendeler key
document.getElementById('search-field').addEventListener('keypress', function (element) {
    console.log(element.key);
    if (element.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}

// not the best way in this solution
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone => {
    const modalTitel = document.getElementById('phoneDetailsModalLabel');
    modalTitel.innerText = phone.name.toUpperCase();
    const modalDiv = document.getElementById('modal-div');
    modalDiv.classList.add('row', 'g-0');
    modalDiv.innerHTML = `
    <div class="col-md-4">
        <img id="img-model" src="${phone.image}" class="img-fluid rounded-start px-3" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5><br>
            <p class="card-text">This is a wider card with supporting text below as a
                natural lead-in to additional content. This content is a little bit longer.
            </p>
            <p class="card-text"><small class="text-muted">${phone.releaseDate ? phone.releaseDate : 'No Relesas Date Found'}</small>
            </p>
        </div>
    </div>
    `
}

loadPhones('a');