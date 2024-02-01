const API_URL = 'http://127.0.0.1:8000';

const getProductIssueReport = async () => {
    const response = await fetch(`${API_URL}/reportes/ProductIssueReport`);
    const data = await response.json();
    return data;
};
const getCompanyResponseReport = async () => {
    const response = await fetch(`${API_URL}/reportes/CompanyResponseReport`);
    const data = await response.json();
    return data;
};

const getDisputedIssuesByState = async () => {
    const response = await fetch(`${API_URL}/reportes/DisputedIssuesByState`);
    const data = await response.json();
    return data;
};

const getComplaintsByDate = async () => {
    const response = await fetch(`${API_URL}/reportes/ComplaintsByDate`);
    const data = await response.json();
    return data;
};

const createTable = (containerId, dataOrigin) => {
    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    table.classList.add('table', 'w-full', 'border', 'border-collapse', 'mb-4');

    const thead = document.createElement('thead');
    thead.classList.add('bg-blue-600');

    const tbody = document.createElement('tbody');

    // Obtener las claves (campos) del primer objeto
    const { data } = dataOrigin;
    const keys = Object.keys(data[0]);

    // Agregar encabezados
    const headerRow = document.createElement('tr');
    headerRow.classList.add('border-b');
    keys.forEach((key) => {
        const th = document.createElement('th');
        th.classList.add('py-2', 'px-4', 'text-left', 'font-semibold');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Agregar filas de datos
    data.forEach((item) => {
        // Verificar si el objeto es válido antes de intentar acceder a sus propiedades
        if (item && typeof item === 'object') {
            const row = document.createElement('tr');
            keys.forEach((key) => {
                const td = document.createElement('td');
                td.classList.add('py-2', 'px-4', 'border-b');
                td.textContent = item[key];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);
};

const getDataAll = async () => {
    const datosOne = await getProductIssueReport();
    const datosTwo = await getCompanyResponseReport();
    const datosThree = await getDisputedIssuesByState();
    const datosFour = await getComplaintsByDate();

    console.log(datosOne);
    await createTable('modulo-1', datosOne);
    await createTable('modulo-2', datosTwo);
    await createTable('modulo-3', datosThree);
    await createTable('modulo-4', datosFour);
};

getDataAll();
