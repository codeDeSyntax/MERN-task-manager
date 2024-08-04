
import { Spin } from 'antd';
 // Import Ant Design styles

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <Spin size="large" />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default Loader;
