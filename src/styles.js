export const extensionStyles = `
  body {
    position: relative;
  }
  .line-draw {
    z-index: 9999999;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
  }
  .line-draw-wrapper {
    z-index: 9999999;
    position: fixed;
    right: 5px;
    top: 5px;
    width: 200px;
    height: 150px;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line-draw-color-picker {
    width: 50%;
    margin-top: 30px;
  }
  .line-draw-reset-button {
    width: 80%;
    margin: 0 auto;
    padding: 8px;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(to right, #77abda, #665cf5);
    border: none;
    border-radius: 20px;
    margin: auto auto 10px;
    cursor: pointer;
  }
  .line-draw-reset-button:hover {
    opacity: 0.75;
  }
`;
