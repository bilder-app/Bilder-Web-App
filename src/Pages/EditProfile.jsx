import { useRef, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { Contacts, Store } from "@material-ui/icons";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { useForm, useWatch } from "react-hook-form";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useMyBusiness } from "../Components/hooks/queries";
import { useQueryClient } from "react-query";
import { editMyBusiness } from "../api";
import { useSnackbar } from "notistack";
import axios from "axios";

const styles = {
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.05rem",
    fontWeight: 500,
    marginTop: 10
  },
  input: {
    border: "thin solid #DFDEDE",
    borderRadius: 16,
    marginTop: 5,
    padding: 8,
    fontSize: "1.05rem",
    height: "2.30rem"
  }
};

function EditProfile({ match: { params }, history }) {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, control, setValue } = useForm();
  const { ref: imageRef, ...registerRest } = register("profilePicture");

  const profilePicture = useWatch({
    control,
    name: "profilePicture"
  });

  const queryClient = useQueryClient();
  const { data: businessData, isLoading } = useMyBusiness();
  const imageUploadRef = useRef();

  const onSubmit = (values) => {
    history.replace("/me");

    const isCreatingKey = enqueueSnackbar("Editando perfil", {
      variant: "info",
      autoHideDuration: 5000,
      action: (key) => (
        <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
          Cerrar
        </Button>
      )
    });

    const formData = new FormData();
    formData.append("file", profilePicture[0]);
    formData.append("api_key", 793125359922876);
    formData.append("upload_preset", "defaultp");
    axios
      .post("https://api.cloudinary.com/v1_1/drolfnia6/image/upload", formData)
      .then((resp) => {
        const { url } = resp.data;

        editMyBusiness({
          ...values,
          profileImage: url
        }).then(() => {
          closeSnackbar(isCreatingKey);

          enqueueSnackbar("Producto editado exitosamente", {
            variant: "success",
            autoHideDuration: 5000,
            action: (key) => (
              <Button
                style={{ color: "white" }}
                onClick={() => closeSnackbar(key)}
              >
                Cerrar
              </Button>
            )
          });

          queryClient.invalidateQueries("me");
        });
      });
  };

  useEffect(() => {
    if (isLoading) return;
    const { name, surname, cuit, sector, address, contact, nameBusiness } =
      businessData;
    setValue("name", name);
    setValue("surname", surname);
    setValue("nameBusiness", nameBusiness);
    setValue("cuit", cuit);
    setValue("sector", sector);
    setValue("address", address);
    setValue("contact", contact);
  }, [businessData, isLoading]);

  if (isLoading) return null;

  const { profileImage } = businessData;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6
          }}
        />
        <Typography variant="h6">Editar Perfil</Typography>
      </div>
      <div style={{ padding: 10 }}>
        <div
          style={{
            width: "100%",
            // borderBottom: "solid 2px #ccc",
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ height: 0, width: 0, position: "absolute" }}
            {...registerRest}
            ref={(e) => {
              imageRef(e);
              imageUploadRef.current = e;
            }}
          />
          <button
            type="button"
            style={{
              height: 150,
              width: 150,
              padding: 5,
              borderRadius: 100,
              border: "thin solid #DFDEDE",
              objectFit: "cover",
              background: "transparent"
            }}
            onClick={() => imageUploadRef.current.click()}
          >
            {profilePicture || profileImage ? (
              <img
                alt="imagen de producto"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%"
                }}
                src={
                  (profilePicture && URL.createObjectURL(profilePicture[0])) ||
                  profileImage
                }
              />
            ) : (
              <AddAPhotoIcon
                style={{
                  height: "50%",
                  width: "50%",
                  opacity: 0.25
                }}
              />
            )}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            paddingBottom: 5,
            alignItems: "center",
            paddingTop: 10
          }}
        >
          <Contacts style={{ marginRight: 10 }} />
          <Typography variant="h6">Sobre mi</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <label style={{ ...styles.label, width: "47.5%" }}>
            Nombre
            <input
              required
              {...register("name")}
              style={{ ...styles.input, textAlign: "center" }}
            />
          </label>
          <label style={{ ...styles.label, width: "47.5%" }}>
            Apellido
            <input
              required
              {...register("surname")}
              style={{ ...styles.input, textAlign: "center" }}
            />
          </label>
        </div>
        <label style={styles.label}>
          E-mail
          <input {...register("brand")} style={styles.input} type="email" />
        </label>
        <div
          style={{
            display: "flex",
            paddingBottom: 5,
            paddingTop: 5,
            alignItems: "center"
          }}
        >
          <Store style={{ marginRight: 10 }} />
          <Typography variant="h6">Sobre mi negocio</Typography>
        </div>
        <label style={{ ...styles.label }}>
          Nombre del Negocio
          <input required {...register("nameBusiness")} style={styles.input} />
        </label>
        <label style={styles.label}>
          CUIT
          <input {...register("cuit")} style={styles.input} type="number" />
        </label>
        <label style={styles.label}>
          Industria
          <select required {...register("sector")} style={styles.input}>
            <option value="">Seleccione ...</option>
            <option>Bulonera</option>
            <option>Ferreteria</option>
            <option>Materiales de Construcción</option>
            <option>Siderometalurgia</option>
            <option>Maderera</option>
            <option>Pintureria</option>
            <option>Materiales electricos</option>
            <option>Griferia</option>
            <option>Regatones</option>
          </select>
        </label>
        <label style={styles.label}>
          Dirección
          <input {...register("address")} style={styles.input} />
        </label>
        <label style={styles.label}>
          Contacto
          <input {...register("contact")} style={styles.input} type="number" />
        </label>
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          color: "white",
          marginTop: 5,
          width: "100%",
          borderRadius: 16,
          fontSize: "1.1rem"
        }}
      >
        Editar Perfil
      </Button>
    </form>
  );
}

export default EditProfile;
