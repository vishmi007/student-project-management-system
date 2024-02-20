import React from 'react';
import Card from 'react-bootstrap/Card';

// Function to generate a unique color based on the input string
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return `#${'000000'.slice(0, 6 - color.length)}${color}`;
  }

export default function TeamMembersCard({ teamMemberNames }) {
    return (
      <Card style={{ border: '1px solid lightgrey', backgroundColor: 'white', height: '30rem', width: '29rem' }}>
        <Card.Body style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.4rem' }}><span>Team Members:</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
                {teamMemberNames.map((memberName, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                  {/* Render the circle with initials */}
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: stringToColor(memberName), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: '0.5rem' }}>
                    {memberName.split(' ').map(word => word[0]).join('')}
                  </div>
                  {/* Display the full name */}
                  <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{memberName}</div>
                </div>
                ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }