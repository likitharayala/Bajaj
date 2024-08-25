import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const JsonInputForm = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'numbers', label: 'Numbers' },
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);

        try {
            const parsedInput = JSON.parse(jsonInput);
            const result = await axios.post('https://<your-api-url>/bfhl', parsedInput);
            setResponse(result.data);
        } catch (err) {
            setError('Invalid JSON input or server error');
        }
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const renderResponse = () => {
        if (!response) return null;

        return selectedOptions.map(option => (
            <div key={option.value}>
                <h4>{option.label}</h4>
                <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
            </div>
        ));
    };

    return (
        <div>
            <h1>JSON Input Form</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows="5"
                    cols="50"
                    placeholder='Enter JSON here...'
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <>
                    <h3>Select data to display:</h3>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                    />
                    {renderResponse()}
                </>
            )}
        </div>
    );
};

export default JsonInputForm;
