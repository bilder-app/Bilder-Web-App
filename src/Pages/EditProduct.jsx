import { useRef, useState, useEffect } from "react";
import { TextareaAutosize, Typography, Button } from "@material-ui/core";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useGetProductById } from "../Components/hooks/queries";
import { editProduct } from "../api";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
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
    height: "2.45rem"
  }
};

function EditProduct({ match: { params }, history }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();
  const { data: productData = {} } = useGetProductById(params.productId);
  const imageUploadRef = useRef();
  const [uploadedImage, setUploadedImage] = useState();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (values) => {
    history.replace("/products");

    const isCreatingKey = enqueueSnackbar("Creando producto", {
      variant: "info",
      action: (key) => (
        <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
          Cerrar
        </Button>
      )
    });

    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("api_key", 793125359922876);
    formData.append("upload_preset", "defaultp");

    const imageUrl = await axios
      .post("https://api.cloudinary.com/v1_1/drolfnia6/image/upload", formData)
      .then((resp) => resp.data.url);

    editProduct(params.productId, {
      ...values,
      images: [imageUrl]
    }).then(() => {
      closeSnackbar(isCreatingKey);

      enqueueSnackbar("Producto creado exitosamente", {
        variant: "success",
        action: (key) => (
          <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
            Cerrar
          </Button>
        )
      });

      queryClient.invalidateQueries("products");
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
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
      images
    } = productData;
    setValue("name", name);
    setValue("description", description);
    setValue("price", price);
    setValue("stock", stock);
    setValue("brand", brand);
    setValue("model", model);
    setValue("content", content);
    setValue("contentType", contentType);
    setUploadedImage(images[0]);
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
            marginRight: 6
          }}
        />
        <Typography variant="h6">Editar Producto</Typography>
      </div>
      <div style={{ padding: 10 }}>
        <div
          style={{
            height: 150,
            display: "flex",
            justifyContent: "space-between"
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
              height: "100%",
              width: "48%",
              padding: 5,
              border: "thin solid #DFDEDE",
              objectFit: "cover",
              background: "transparent"
            }}
            onClick={() => imageUploadRef.current.click()}
          >
            {uploadedImage ? (
              <img
                alt="imagen de producto"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={
                  typeof uploadedImage === "string"
                    ? uploadedImage
                    : URL.createObjectURL(uploadedImage)
                }
              />
            ) : (
              <AddAPhotoIcon
                style={{
                  height: "75%",
                  width: "75%",
                  opacity: 0.25
                }}
              />
            )}
          </button>
          <div style={{ width: "48%", marginTop: -10 }}>
            <label style={styles.label}>
              Stock*
              <input
                required
                {...register("stock")}
                style={styles.input}
                type="number"
              />
            </label>
            <label style={styles.label}>
              Precio Unitario*
              <input
                required
                {...register("price")}
                style={styles.input}
                type="number"
                step="any"
              />
            </label>
          </div>
        </div>

        <label style={styles.label}>
          Nombre*
          <input required {...register("name")} style={styles.input} />
        </label>
        <label style={styles.label}>
          Marca
          <input {...register("brand")} style={styles.input} />
        </label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ ...styles.label, width: "47.5%" }}>
            Contenido*
            <input
              required
              {...register("content")}
              style={{ ...styles.input, textAlign: "center" }}
              type="number"
            />
          </label>
          <select
            {...register("contentType")}
            style={{
              ...styles.input,
              alignSelf: "flex-end",
              width: "47.5%"
            }}
          >
            <option>Kilo (k)</option>
            <option>Gramo (g)</option>
            <option>Metro (m)</option>
            <option>Metro cúbico (m3)</option>
            <option>Centimetro (cm)</option>
            <option>Centimetro cúbico (cc)</option>
            <option>Pulgada ('')</option>
            <option>Litro (l)</option>
            <option>Militro (ml)</option>
            <option>Unidad (u)</option>
            <option>Watt (w) </option>
          </select>
        </div>
        <label style={styles.label}>
          Modelo
          <input {...register("model")} style={styles.input} />
        </label>
        <label style={styles.label}>
          Descripción*
          <TextareaAutosize
            {...register("description")}
            style={{
              fontSize: "1.05rem",
              border: "thin solid #DFDEDE",
              borderRadius: 16
            }}
            rowsMin={5}
          />
        </label>
        <label style={styles.label}>
          Categorias*
          <select {...register("categories")} style={styles.input}>
            <option>Pinturas</option>
          </select>
        </label>
        <label style={styles.label}>
          Subcategorias*
          <select {...register("subcategories")} style={styles.input}>
            <option>Latex</option>
          </select>
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
        Editar Producto
      </Button>
    </form>
  );
}

export default EditProduct;
