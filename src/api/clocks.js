import axios from 'axios';

const host = "http://87.249.49.97:71";
const userToken = "Bearer" + " " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsInNlc3Npb25faWQiOjE0NywiaWF0IjoxNzA3MzEyMzQ5LCJuYmYiOjE3MDczMTIzNDksImp0aSI6ImQ4MzJiNWQyLWI3NjQtNDljOS1iYWI0LTE1NWVlZTYwNWVhZCIsInR5cGUiOiJhY2Nlc3MifQ.gi6PkSulW5n6Noz-eWiHdjf28AKyiHJ7n7qeITUVm6Q';



async function createProject(projectData) {
    try {
        const response = await axios.post(host + `/api/projects/`, 
        {
            name: projectData.name,
            description: projectData.description,
            price: projectData.price,
            is_public: projectData.isPublic,
        }, 
        {
            headers: {
                'Authorization': userToken,
                "Content-Type": "application/json",
            }
        });
        const { data: { data } } = response;
        return data;
    } catch (err) {
        throw new Error(`api/clocks:createProject => ${err}`);
    }
}

export {
    createProject,
}