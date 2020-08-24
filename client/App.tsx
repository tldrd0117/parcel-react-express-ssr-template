import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import css from 'styled-jsx/css';
import { Helmet } from 'react-helmet';

interface Props {
    name: string;
}

const TestButton = () => {
    const handleClick = () => {
        console.log('click');
    };
    return (
        <>
            <button className={`hello to `} onClick={handleClick}>
                click!
            </button>
            {}
            <style jsx>{`
                .to {
                    color: white;
                }
            `}</style>
        </>
    );
};

class App extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return (
            <>
                <Helmet defaultTitle="HELLO">
                    <meta charSet="utf-8" />
                </Helmet>
                <h1 className="text-4xl text-white bg-black hello">hello5 {name}</h1>
                <p className={''}>abcd</p>
                <TestButton />
                <style jsx global>{`
                    @tailwind base;
                    @tailwind components;
                    @tailwind utilities;
                `}</style>
                <style jsx>{`
                    .hello {
                        background-color: #ff0000;
                    }
                `}</style>
            </>
        );
    }
}

// export default App
export default hot(module)(App);
