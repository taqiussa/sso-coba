export function queryURL(json) {
        return new URLSearchParams(json).toString();
}

export function createFormData(json) {
        const formData = new FormData();
        Object.keys(json).forEach(key => {
                formData.append(key, json[key]);
        });
        return formData;
}
