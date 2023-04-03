import WatchlistList from './WatchlistList';

const WatchlistBox = () => {
    const user = localStorage.getItem('user');

    return (
        <>
        {user && //remove the ! later!!!!!!!!! for checking only!!!
            <div className="box">
                <p className="large-text"><strong>Watchlist</strong></p>
                <WatchlistList/>
            </div>
        }
        </>
    )
}

export default WatchlistBox;