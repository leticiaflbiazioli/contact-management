import styled from "styled-components";

const ContactsWrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    font-family: "Poppins", sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
  }

  .addButton {
    background: linear-gradient(135deg, #6f86d6, #48c6ef);
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .addButton:hover {
    background: linear-gradient(135deg, #48c6ef, #6f86d6);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
  }

  .table th,
  .table td {
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table th {
    background-color: #f4f4f4;
    font-size: 1.1rem;
    color: #666;
  }

  .table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .editButton {
    background-color: #48c6ef;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .editButton:hover {
    background-color: #6f86d6;
  }

  .deleteButton {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .deleteButton:hover {
    background-color: #ff4c4c;
  }
`;

export default ContactsWrapper;
