import React from 'react';

const styles = {
  colorPrimary: '#00c6ff',
  colorBackgroundBox: 'rgba(255, 255, 255, 0.04)',
  colorBackgroundTable: 'rgba(0, 0, 0, 0.2)',
  colorBorderDefault: 'rgba(255, 255, 255, 0.1)',
  colorRowEven: 'rgba(255, 255, 255, 0.05)',
  colorRowOdd: 'rgba(0, 0, 0, 0.15)',
  colorRowHover: 'rgba(0, 198, 255, 0.2)',
  colorTextLight: '#ffffff',
  colorTextDefault: '#f0f0f0',
  colorCgpaHigh: '#90ee90',
  colorCgpaLow: '#ff6347',

  outputBox: {
    padding: '20px',
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    borderRadius: '12px',
    maxHeight: '500px',
    overflowY: 'auto',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(8px)',
    color: '#f0f0f0',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
  },

  tableContainer: {
    overflowX: 'auto',
  },

  dataTable: {
    borderCollapse: 'collapse',
    width: '100%',
  },

  tableHeader: {
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    padding: '12px 10px',
    background: '#243b55',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
  },

  tableCell: {
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    padding: '10px 8px',
    textAlign: 'center',
  },


  objectOutput: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px dashed #00c6ff',
    padding: '15px',
    borderRadius: '8px',
    color: '#aaffaa',
    fontSize: '0.9rem',
  }
};

const OutputBox = ({ output }) => {
  const isArray = Array.isArray(output);
  const keys = isArray && output.length > 0 ? Object.keys(output[0]) : [];


  const getRowBackground = (idx) => (
    idx % 2 === 0 ? styles.colorRowEven : styles.colorRowOdd
  );

 
  const getCgpaStyles = (key, value) => {
    if (key.toLowerCase() !== 'cgpa') {
      return { color: styles.colorTextDefault, fontWeight: 'normal' };
    }

    let color = styles.colorTextDefault;
    if (value >= 9) {
      color = styles.colorCgpaHigh;
    } else if (value < 6) {
      color = styles.colorCgpaLow;
    }

    return { color: color, fontWeight: 'bold' };
  };

  return (
    <div className="output-box" style={styles.outputBox}>

      {typeof output === 'string' && <p>{output}</p>}

      {isArray && (
        <div style={styles.tableContainer}>
          <table style={styles.dataTable}>
            <thead>
              <tr>
                {keys.map((key) => (
                  <th key={key} style={styles.tableHeader}>
                    {key.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {output.map((item, idx) => {
                const rowBaseStyle = {
                  background: getRowBackground(idx),
                  transition: 'background-color 0.3s ease',
                };
                
                return (
                  <tr
                    key={idx}
                    style={rowBaseStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.background = styles.colorRowHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = getRowBackground(idx))}
                  >
                    {keys.map((key) => {
                      const value = item[key];
                      const cellStyle = {
                        ...styles.tableCell,
                        ...getCgpaStyles(key, value),
                      };

                      return (
                        <td key={key} style={cellStyle}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {typeof output === 'object' && !isArray && (
        <pre style={styles.objectOutput}>
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default OutputBox;