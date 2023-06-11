const validaciones = {
	fechaNacimiento: (input) => validarNacimiento(input),
};

const tiposDeErrores = [
	"valueMissing",
	"typeMismatch",
	"patternMismatch",
	"customError",
];

const mensajesDeError = {
	nombre: {
		valueMissing: "Este campo no puede estar vació.",
	},

	correo: {
		valueMissing: "Este campo no puede estar vació.",
		typeMismatch: "El correo no es valido",
	},
	contrasena: {
		valueMissing: "Este campo no puede estar vació.",
		patternMismatch:
			"Al menos 6 caracteres, máximo 16, debe contener una letra minúscula, una letra mayúscula, un numero y un carácter especial (!,#,%).",
	},
	fechaNacimiento: {
		valueMissing: "Este campo no puede estar vació.",
		customError: "Debes tener al menos 18 años de edad.",
	},

	numeroTelefono: {
		valueMissing: "Este campo no puede estar vació.",
		patternMismatch: "El formato requerido es XXXXXXXX, 8 numeros.",
	},

	direccionCompleta: {
		valueMissing: "Este campo no puede estar vació.",
		patternMismatch: "La direccion debe contener entre 10 - 40 caracteres.",
	},

	direccionCiudad: {
		valueMissing: "Este campo no puede estar vació.",
		patternMismatch: "La ciudad debe contener entre 4 - 30 caracteres.",
	},

	direccionEstado: {
		valueMissing: "Este campo no puede estar vació.",
		patternMismatch: "El estado debe contener entre 4 - 30 caracteres.",
	},
};

function visualizarMensajeDeError(tipoDeInput, input) {
	let mensaje;

	tiposDeErrores.forEach((error) => {
		if (input.validity[error]) {
			mensaje = mensajesDeError[tipoDeInput][error];
		}
	});

	return mensaje;
}

function validarNacimiento(input) {
	const fechaUsuario = new Date(input.value);
	let mensaje = "";

	if (!mayorEdad(fechaUsuario)) {
		mensaje = "Debes tener al menos 18 años de edad.";
	}

	input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
	const fechaActual = new Date();
	const diferenciaFechas = new Date(
		fecha.getUTCFullYear() + 18,
		fecha.getUTCMonth(),
		fecha.getUTCDate()
	);
	return diferenciaFechas <= fechaActual;
}

export function validar(input) {
	const tipoInput = input.dataset.tipo;
	if (validaciones[tipoInput]) {
		validaciones[tipoInput](input);
	}

	if (input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerText =
			"";
	} else {
		input.parentElement.classList.add("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerText =
			visualizarMensajeDeError(tipoInput, input);
	}
}
