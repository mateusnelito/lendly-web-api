export const strongPasswordRegex =
	/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g;

export const humanNameRegex =
	/^(?!.*[ '-]{2})[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-](?:[A-Za-zÀ-ÖØ-öø-ÿ]+|d[eao]s?))*$/;

export const safeDescriptionRegex =
	/^(?!.*\s{2})[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;'"-]{1,498}[A-Za-zÀ-ÖØ-öø-ÿ0-9]$/;

export const angolanPhoneRegex = /99|9[1-5]\d{7}$/gm;
