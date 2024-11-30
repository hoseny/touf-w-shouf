const HomePageVideo = () => {
    return (
        <div>
            <video
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                loop
                muted
                autoPlay
                src="/New-MIsrtravel.mp4"
            />
        </div>
    );
};

export default HomePageVideo;
