//import "@/styles/globals.css";
import "../styles/globals.css";
import { AuthProvider } from '../context/AuthContext';



/*export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
*/


export default function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}