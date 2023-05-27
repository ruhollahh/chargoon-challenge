import { useEffect, useState, useCallback } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { useTreeDataStore } from "./Store/useTreeDataStore";

function App() {
  const [showEdit, setShowEdit] = useState(true);
  const store = useTreeDataStore();
  const { setInitialData } = store;

  const fetchTreeData = useCallback(async () => {
    const result = await getNodes();
    setInitialData(result);
  }, [setInitialData]);

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  return (
    <AppContext.Provider value={store}>
      <div className="App">
        <Sidebar>
          <ExtendedTree />
        </Sidebar>
        {showEdit && <Form />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
