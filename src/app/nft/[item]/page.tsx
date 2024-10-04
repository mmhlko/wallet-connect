type TNftItemPageProps = {
    params: { address: string }
}

const NftItemPage = ({ params }:TNftItemPageProps) => {
    return (
        <>
            <h2>NftItemPage</h2>
            <p>{params.address}</p>
        </>
    )
}

export default NftItemPage;