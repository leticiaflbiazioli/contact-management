import styled from "styled-components";

const LoginWrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    background: linear-gradient(135deg, #6f86d6, #48c6ef);
    font-family: "Poppins", sans-serif;
  }

  .card {
    background-color: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    z-index: 1;
    text-align: center;
    max-width: 350px;
    width: 100%;
  }

  .title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input {
    padding: 15px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    background: #f4f4f4;
    outline: none;
    transition: 0.3s;
  }

  .input:focus {
    background: #e6e6e6;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }

  .button {
    background-color: #48c6ef;
    color: white;
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #6f86d6;
  }

  .forgot {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
  }

  .forgot:hover {
    color: #48c6ef;
  }

  .background {
    position: absolute;
    width: 100vw;
    height: 100vh;

    opacity: 0.3;
  }
`;

export default LoginWrapper;
