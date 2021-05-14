import { useRef, useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { Contacts, Store } from "@material-ui/icons";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useGetProductById } from "../Components/hooks/queries";
import { editProduct } from "../api";
import axios from "axios";

const styles = {
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.05rem",
    fontWeight: 500,
    marginTop: 10,
  },
  input: {
    border: "thin solid #DFDEDE",
    borderRadius: 16,
    marginTop: 5,
    padding: 8,
    fontSize: "1.05rem",
    height: "2.30rem",
  },
};

function EditProfile({ match: { params }, history }) {
  const { register, handleSubmit, setValue } = useForm();
  const { data: productData = {} } = useGetProductById(params.productId);
  const imageUploadRef = useRef();
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("api_key", 793125359922876);
      formData.append("upload_preset", "defaultp");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/drolfnia6/image/upload",
          formData
        )
        .then((resp) => {
          setUploadedImageUrl(resp.data.url);
        });

      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (values) => {
    editProduct(params.productId, {
      ...values,
      images: [uploadedImageUrl],
    }).then(() => history.replace("/products"));
  };

  useEffect(() => {
    const {
      name,
      description,
      price,
      stock,
      brand,
      model,
      content,
      contentType,
      images,
    } = productData;
    setValue("name", name);
    setValue("description", description);
    setValue("price", price);
    setValue("stock", stock);
    setValue("brand", brand);
    setValue("model", model);
    setValue("content", content);
    setValue("contentType", contentType);
  }, [productData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6,
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
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ height: 0, width: 0, position: "absolute" }}
            ref={imageUploadRef}
            onChange={handleImageUpload}
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
              background: "transparent",
            }}
            onClick={() => imageUploadRef.current.click()}
          >
            {uploadedImage ? (
              <img
                alt="imagen de producto"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={uploadedImage}
              />
            ) : (
              <AddAPhotoIcon
                style={{
                  height: "50%",
                  width: "50%",
                  opacity: 0.25,
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
            paddingTop: 10,
          }}
        >
          <Contacts style={{ marginRight: 10 }} />
          <Typography variant="h6">Sobre mi</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label style={{ ...styles.label, width: "47.5%" }}>
            Nombre
            <input
              required
              {...register("content")}
              style={{ ...styles.input, textAlign: "center" }}
            />
          </label>
          <label style={{ ...styles.label, width: "47.5%" }}>
            Apellido
            <input
              required
              {...register("content")}
              style={{ ...styles.input, textAlign: "center" }}
            />
          </label>
        </div>
        <label style={styles.label}>
          E-mail
          <input {...register("brand")} style={styles.input} />
        </label>
        <div
          style={{
            display: "flex",
            paddingBottom: 5,
            paddingTop: 5,
            alignItems: "center",
          }}
        >
          <Store style={{ marginRight: 10 }} />
          <Typography variant="h6">Sobre mi negocio</Typography>
        </div>
        <label style={styles.label}>
          CUIT
          <input {...register("model")} style={styles.input} type="number" />
        </label>
        <label style={styles.label}>
          Industria
          <select {...register("categories")} style={styles.input}>
            <option>Pinturas</option>
          </select>
        </label>
        <label style={styles.label}>
          Dirección
          <input {...register("model")} style={styles.input} />
        </label>
        <label style={styles.label}>
          Contacto
          <input {...register("model")} style={styles.input} type="number" />
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
          fontSize: "1.1rem",
        }}
      >
        Editar Perfil
      </Button>
    </form>
  );
}

export default EditProfile;
