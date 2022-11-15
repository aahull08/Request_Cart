import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import BinsPage from "./components/BinsPage";
import CartPage from "./components/CartPage";

const theme = createTheme({
  typography: {
    fontFamily: "Neometric",
  },
  pallete: {
    primary: {
      main: "#7398FF",
    },
    delete: {
      main: "#ff4639",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#7398FF",
          border: "1px solid rgba(115, 152, 255, 1)",
        },
      },
      variants: [
        {
          props: { variant: "delete" },
          style: {
            color: "#ff4639",
            border: "1px solid rgba(255, 70, 57, 1)",
          },
        },
      ],
    },
  },
});

function App() {


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/carts" element={<BinsPage />} />
            <Route path="/carts/:cartURL" element={<CartPage />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
