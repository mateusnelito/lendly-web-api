export const passwordRegex =
	/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,255})/g;
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
export const descriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;'"-]{10,500}$/;
export const phoneRegex = /99|9[1-5]\d{7}$/gm;
