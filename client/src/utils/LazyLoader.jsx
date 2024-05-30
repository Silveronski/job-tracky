import { Suspense, lazy } from "react"
import Loading from "../components/Loading";

const LazyLoader = (Component) => (props) => {
    const LazyComponent = lazy(Component);
    return (
        <Suspense fallback={<Loading/>}>
            <LazyComponent {...props}/>
        </Suspense>
    )
}

export default LazyLoader