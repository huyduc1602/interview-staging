import React from 'react';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Our Platform</h1>
                <p>Your one-stop solution for all needs</p>
            </header>
            
            <main className="home-main">
                <section className="features">
                    <h2>Our Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Feature 1</h3>
                            <p>Description of feature 1</p>
                        </div>
                        <div className="feature-card">
                            <h3>Feature 2</h3>
                            <p>Description of feature 2</p>
                        </div>
                        <div className="feature-card">
                            <h3>Feature 3</h3>
                            <p>Description of feature 3</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;