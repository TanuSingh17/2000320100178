
import React, { useState } from 'react';
import axios from 'axios';

const NumberManagementService = () => {
  const [result, setResult] = useState([]);

  const handleGetNumbers = async (urls) => {
    try {
      const promises = urls.map((url) => axios.get(url));
      const responses = await Promise.allSettled(promises);

      const validResponses = responses
        .filter((response) => response.status === 'fulfilled' && response.value.data.numbers)
        .map((response) => response.value.data.numbers);

      const mergedNumbers = [].concat(...validResponses);
      const uniqueNumbers = Array.from(new Set(mergedNumbers));

      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
      setResult(sortedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          handleGetNumbers([
            'http://20.244.56.144/numbers/primes',
            'http://20.244.56.144/numbers/fibo',
            'http://20.244.56.144/numbers/odd',
          ])
        }
      >
        Get Numbers
      </button>
      <div>
        {result.length > 0 && (
          <div>
            <h3>Numbers:</h3>
            <ul>
              {result.map((num) => (
                <li key={num}>{num}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberManagementService;
