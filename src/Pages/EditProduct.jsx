import { useRef, useState, useEffect } from "react";
import {
  TextareaAutosize,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  makeStyles,
  AccordionDetails,
} from "@material-ui/core";
import {
  ChevronLeft as BackIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import Carousel from "react-material-ui-carousel";
import { useForm } from "react-hook-form";
import { useGetProductById } from "../Components/hooks/queries";
import { 
  editProduct,
  getAllCategories,
  getSubcategories,
} from "../api";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  imageLoadingText: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.75)",
    color: "white",
    display: "grid",
    placeItems: "center",
  },
  carouselWrapper: { paddingTop: "100%", width: "100%", position: "relative" },
  carousel: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  removeImageBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  textSecondary: { color: theme.palette.text.secondary },
  errorInputMessage: { color: theme.palette.error.main },
}));

const styles = {
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.05rem",
    fontWeight: 500,
    marginTop: 10,
    width: "100%",
  },
  input: {
    border: "thin solid #DFDEDE",
    borderRadius: 16,
    marginTop: 5,
    padding: 8,
    fontSize: "1.05rem",
    height: "2.45rem",
    width: "100%",
  },
};

function EditProduct({ match: { params }, history }) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors = {} },
  } = useForm();

  const { data: productData = {} } = useGetProductById(params.productId);
  const imageUploadRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [storageRef, setStorageRef] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data))
  },)

  const getSubcategoriesAsync = async () => {
    const sel = document.getElementById("category"),
          name = sel.options[sel.selectedIndex].text,
          sub = await getSubcategories(name);
    setSubCategories(sub);
  }

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyABdnic2WsbLUXMu-EVVV9ijDncQzNCJPM",
      authDomain: "bilder-301ea.firebaseapp.com",
      projectId: "bilder-301ea",
      storageBucket: "bilder-301ea.appspot.com",
      messagingSenderId: "1014595861688",
      appId: "1:1014595861688:web:91918b539e881f8fc5c84d",
    };

    let firebaseApp;
    if (firebase.apps.length === 0) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }

    setStorageRef(firebase.storage().ref());
  }, []);

  const onSubmit = async (values) => {
    history.replace("/products");

    const isCreatingKey = enqueueSnackbar("Editando producto", {
      variant: "info",
      autoHideDuration: 5000,
      action: (key) => (
        <Button style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
          Cerrar
        </Button>
      ),
    });

    const imageUploadPromises = [];
    const urlsStrings = [];

    for (const image of uploadedImages) {
      if (typeof image === "string") {
        urlsStrings.push(image);
        continue;
      }
      const imageRef = storageRef.child(image.name + ~~(Math.random() * 10000));
      imageUploadPromises.push(
        imageRef.put(image).then((snapshot) =>
          storageRef
            .child(snapshot.ref.fullPath)
            .getDownloadURL()
            .then((url) => url)
        )
      );
    }

    await Promise.all(imageUploadPromises).then((imagesUrl) =>
      editProduct(params.productId, {
        ...values,
        images: [...imagesUrl, ...urlsStrings],
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
          ),
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
    setUploadedImages(images);
  }, [productData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <BackIcon
          onClick={() =>
            history.replace(`/products/productDetails/${params.productId}`)
          }
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6,
          }}
        />
        <Typography variant="h6">Editar Producto</Typography>
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
                        objectFit: "cover",
                      }}
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
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
            gap: 15,
          }}
        >
          <label style={styles.label}>
            Stock
            <input
              required
              min={1}
              max={5000}
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
              min={1}
              max={100_000}
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
          {errors.name && (
            <Typography
              variant="subtitle2"
              className={classes.errorInputMessage}
            >
              Por favor ingrese un nombre valido
            </Typography>
          )}
          <input
            required
            maxLength={44}
            {...register("name", {
              pattern: {
                value: /^(?!.*(www.|.com|http|bit\.ly)).*/,
              },
            })}
            style={styles.input}
            placeholder="Obligatorio (Max 44 caracteres)"
          />
        </label>
        <label style={styles.label}>
          Marca
          {errors.brand && (
            <Typography
              variant="subtitle2"
              className={classes.errorInputMessage}
            >
              Por favor ingrese un nombre valido
            </Typography>
          )}
          <input
            minLength={2}
            maxLength={40}
            {...register("brand", {
              pattern: {
                value: /^(?!.*(www.|.com|http|bit\.ly)).*/,
              },
            })}
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
              width: "56%",
            }}
          >
            <option value="">Seleccione ...</option>
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
          {errors.model && (
            <Typography
              variant="subtitle2"
              className={classes.errorInputMessage}
            >
              Por favor ingrese un nombre valido
            </Typography>
          )}
          <input
            minLength={2}
            maxLength={40}
            {...register("model", {
              pattern: {
                value: /^(?!.*(www.|.com|http|bit\.ly)).*/,
              },
            })}
            style={styles.input}
            placeholder="Opcional"
          />
        </label>
        <label style={styles.label}>
          Descripción
          {errors.model && (
            <Typography
              variant="subtitle2"
              className={classes.errorInputMessage}
            >
              Por favor ingrese una descripción valida
            </Typography>
          )}
          <TextareaAutosize
            {...register("description", {
              pattern: {
                value: /^(?!.*(www.|.com|http|bit\.ly)).*/,
              },
            })}
            style={{
              fontSize: "1.05rem",
              border: "thin solid #DFDEDE",
              borderRadius: 16,
            }}
            rowsMin={5}
            placeholder="Obligatorio"
          />
        </label>
        <label style={styles.label}>
          Categorias
          <select 
            required 
            {...register("categoryName")} 
            style={styles.input} 
            id="category"
            onChange={() => getSubcategoriesAsync()}
          >
            <option value="">Seleccione ...</option>
            {categories.length > 0 && 
              categories.map(({ name }, i) => <option key={i}>{ name }</option>)
            }
          </select>
        </label>
        <label style={styles.label}>
          Subcategorias
          <select 
            {...register("subcategories")} 
            style={styles.input} 
            disabled={!subCategories.length}
          >
            <option>Seleccione...</option>
            {subCategories.length > 0 &&
              subCategories.map(({name}, i) => <option key={i}>{name}</option>)
            }
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
          fontSize: "1.1rem",
        }}
      >
        Editar Producto
      </Button>
    </form>
  );
}

export default EditProduct;
