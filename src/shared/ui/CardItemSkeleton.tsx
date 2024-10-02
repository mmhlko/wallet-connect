"use client"
import ContentLoader from "react-content-loader"

const CardItemSkeleton = () => (
    <ContentLoader
        speed={1}
        viewBox="0 0 370 484"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        uniqueKey="CardItemSkeleton"
    >
        <rect x="-1" y="0" rx="32" ry="32" width="100%" height="100%" />
    </ContentLoader>
)

export default CardItemSkeleton