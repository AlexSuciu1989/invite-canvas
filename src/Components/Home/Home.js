import React from 'react';

const Home = ({onButtonClick}) => {
    return (
        <div className="container">
            <header className="text-center py-5">
                <h1 className="display-4">Bine ati venit la Invite Canvas</h1>
                <p className="lead">Creati si distribuiti invitatii frumoase fara efort.</p>
            </header>

            <section className="text-center py-5 bg-light">
                <h2 className="mb-4">Incepeti astazi</h2>
                <p className="mb-4">Alaturati-va miilor de utilizatori care creeaza invitatii uimitoare pentru orice ocazie.</p>
                <button className="btn btn-primary btn-lg" onClick={onButtonClick}>Incepeti sa proiectati</button>
            </section>

            <section className="py-5">
                <h2 className="text-center mb-5">De ce sa alegeti Invite Canvas?</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <h3>Usor de utilizat</h3>
                        <p>Interfata noastra intuitiva face ca proiectarea invitatiilor sa fie usoara.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Sabloane personalizabile</h3>
                        <p>Alegeti dintr-o varietate de sabloane care sa se potriveasca nevoilor dumneavoastra.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Distribuiti instant</h3>
                        <p>Trimiteti invitatiile prin email sau pe retelele sociale in cateva secunde.</p>
                    </div>
                </div>
            </section>

            <footer className="text-center py-4 bg-dark text-white">
                <p>&copy; {new Date().getFullYear()} Invite Canvas. Toate drepturile rezervate.</p>
            </footer>
        </div>
    );
};

export default Home;