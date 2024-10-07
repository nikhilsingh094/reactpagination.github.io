import axios from "axios";
import { useEffect, useState } from "react";

function Pagi() {
  const [userData, setUserData] = useState();
  const [viewPage, setViewPage] = useState(1);

  const [rowsPage, setRowsPage] = useState(5);
  const [pageBtn, setPageBtn] = useState([1, 2, 3]);

  const lastIndex = viewPage * rowsPage;
  const firsIndex = lastIndex - rowsPage;

  const currentItem = userData?.users?.slice(firsIndex, lastIndex);
  const totalPage = Math.ceil(userData?.total / rowsPage);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://dummyjson.com/users?limit=0");
      const resData = await res.data;
      setUserData(resData);
    };
    getData();
  }, []);

  const pageRange = (page) => {
    if (page > pageBtn[2]) {
      setPageBtn([page, page + 1, page + 2]);
    } else if (page < pageBtn[0]) {
      setPageBtn([page - 2, page - 1, page]);
    }
  };

  const handlePrev = () => {
    setViewPage((prev) => Math.max(prev - 1, 1));
    pageRange(viewPage - 1);
  };

  const handleNext = () => {
    setViewPage((prev) => Math.min(prev + 1, totalPage));
    pageRange(viewPage + 1);
  };

  const handleButton = (page) => {
    setViewPage(page);
    pageRange(page);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>

        <tbody>
          {currentItem?.map((value, index) => (
            <tr key={index}>
              <td>{value.firstName}</td>
              <td>{value.email}</td>
              <td>{value.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrev} disabled={viewPage === 1}>Prev</button>
        {pageBtn.map((page) => (
          <button
          key={page}
          className={viewPage === page ? "active" : ""}
            disabled={page > totalPage}
            onClick={() => handleButton(page)}
          >
            {page}
          </button>
        ))}
        {totalPage > pageBtn[2] && <span>...</span>}
        <button onClick={handleNext} disabled={viewPage === totalPage}>Next</button>
      </div>
    </div>
  );
}

export default Pagi;
