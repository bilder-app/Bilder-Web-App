import { useRef, useState } from "react";
import {
  TextareaAutosize,
  Typography,
  Button,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import {
  AssignmentReturnSharp,
  ChevronLeft as BackIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Carousel from "react-material-ui-carousel";
import { addProduct } from "../../api";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  imageLoadingText: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.75)",
    color: "white",
    display: "grid",
    placeItems: "center"
  },
  carouselWrapper: { paddingTop: "100%", width: "100%", position: "relative" },
  carousel: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  removeImageBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  textSecondary: { color: theme.palette.text.secondary }
}));

const styles = {
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.05rem",
    fontWeight: 500,
    marginTop: 10,
    width: "100%"
  },
  input: {
    border: "thin solid #DFDEDE",
    borderRadius: 16,
    marginTop: 5,
    padding: 8,
    fontSize: "1.05rem",
    height: "2.45rem",
    width: "100%"
  }
};

function NewProduct({ history }) {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const imageUploadRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (values) => {
    if (uploadedImages.length === 0) {
      return enqueueSnackbar("Necesita añadir al menos una imagen", {
        variant: "error",
        autoHideDuration: 5000,
        action: (key) => (
          <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
            Cerrar
          </Button>
        )
      });
    }

    history.replace("/products");

    const isCreatingKey = enqueueSnackbar("Creando producto", {
      variant: "info",
      autoHideDuration: 5000,
      action: (key) => (
        <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
          Cerrar
        </Button>
      )
    });

    const imageUploadPromises = [];

    for (const image of uploadedImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("api_key", 793125359922876);
      formData.append("upload_preset", "defaultp");
      imageUploadPromises.push(
        axios
          .post(
            "https://api.cloudinary.com/v1_1/drolfnia6/image/upload",
            formData
          )
          .then((resp) => resp.data.url)
      );
    }

    await Promise.all(imageUploadPromises).then((imagesUrls) =>
      addProduct({ ...values, images: imagesUrls }).then(() => {
        closeSnackbar(isCreatingKey);

        enqueueSnackbar("Producto creado exitosamente", {
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

        queryClient.invalidateQueries("products");
      })
    );
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const updatedImages = [...uploadedImages, e.target.files[0]];
      setUploadedImages(updatedImages);
      if (updatedImages !== 0) setCarouselIdx(updatedImages.length - 1);
    }
  };

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
        <Typography variant="h6">Crear Producto</Typography>
      </div>
      <div style={{ padding: 10 }}>
        <Accordion style={{ marginBottom: 25 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: "bold" }}>
              Añadir Imagenes{" "}
              <Typography
                component="span"
                variant="subtitle2"
                className={classes.textSecondary}
              >
                (Obligatorio)
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            {uploadedImages.length > 0 && (
              <div className={classes.carouselWrapper}>
                <Carousel
                  animation="slide"
                  index={carouselIdx}
                  onChange={(i) => setCarouselIdx(i)}
                  className={classes.carousel}
                  navButtonsAlwaysVisible={true}
                  autoPlay={false}
                  indicators={false}
                >
                  {uploadedImages.map((image, i) => (
                    <img
                      key={image + "" + i}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      src={URL.createObjectURL(image)}
                    />
                  ))}
                </Carousel>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ height: 0, width: 0, position: "absolute" }}
              ref={imageUploadRef}
              onChange={handleImageUpload}
            />
            <Button
              onClick={() => imageUploadRef.current.click()}
              variant="contained"
              color="primary"
            >
              Añadir imagen
            </Button>
            {uploadedImages.length > 0 && (
              <Button
                onClick={() => {
                  const newImages = [...uploadedImages];
                  newImages.splice(carouselIdx, 1);
                  setUploadedImages(newImages);
                }}
                variant="contained"
                className={classes.removeImageBtn}
              >
                Remover imagen
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
        <div
          style={{
            display: "flex",
            gap: 15
          }}
        >
          <label style={styles.label}>
            Stock
            <input
              required
              min="1"
              {...register("stock")}
              style={styles.input}
              type="number"
              placeholder="Obligatorio"
            />
          </label>
          <label style={styles.label}>
            Precio Unitario
            <input
              required
              min="1"
              {...register("price")}
              style={styles.input}
              type="number"
              step="any"
              placeholder="Obligatorio"
            />
          </label>
        </div>

        <label style={styles.label}>
          Nombre
          <input
            required
            {...register("name")}
            style={styles.input}
            placeholder="Obligatorio"
          />
        </label>
        <label style={styles.label}>
          Marca
          <input
            {...register("brand")}
            style={styles.input}
            placeholder="Opcional"
          />
        </label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ ...styles.label, width: "40%" }}>
            Contenido
            <input
              required
              min="1"
              {...register("content")}
              style={{ ...styles.input }}
              type="number"
              placeholder="Obligatorio"
            />
          </label>
          <select
            required
            {...register("contentType")}
            style={{
              ...styles.input,
              alignSelf: "flex-end",
              width: "56%"
            }}
          >
            <option>Seleccione ...</option>
            <option>Kilo (k)</option>
            <option>Gramo (g)</option>
            <option>Metro (m)</option>
            <option>Metro cuadrado(m2)</option>
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
          <input
            {...register("model")}
            style={styles.input}
            placeholder="Opcional"
          />
        </label>
        <label style={styles.label}>
          Descripción
          <TextareaAutosize
            {...register("description")}
            style={{
              fontSize: "1.05rem",
              border: "thin solid #DFDEDE",
              borderRadius: 16
            }}
            rowsMin={5}
            placeholder="Obligatorio"
          />
        </label>
        <label style={styles.label}>
          Categorias
          <select {...register("categories")} style={styles.input}>
            <option>Pinturas</option>
            <option>Construcción</option>
            <option>Electricidad</option>
            <option>Herramientas</option>
            <option>Ferreteria</option>
            <option>Maderas</option>
            <option>Griferia</option>
            <option>Hierros</option>
          </select>
        </label>
        <label style={styles.label}>
          Subcategorias
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
        Crear Producto
      </Button>
    </form>
  );
}

export default NewProduct;
