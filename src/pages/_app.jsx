import { useRouter } from "next/router";
import "./global.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    return (
        <div key={router.pathname}>
            <Component {...pageProps} />
        </div>
    );
}

export default App;
