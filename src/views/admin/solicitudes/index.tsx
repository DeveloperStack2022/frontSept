import { useState, useCallback, useEffect } from "react";
import TableComponent from "./components/table";
// TODO: Schemas
import { SolicitudAction } from "@/schemas/solicitud-schema";
// Component
import TagInput from "@/components/tag-input";
// Custom components
import Modal from "./components/modal";
import AutoCompleteSearch from "./components/AutoCompleteSearch";

//Services
import { getPaginateSolicitudes,searchSolicitudByCaso,searchSolicitudByIp,searchSolicitudByZona } from "@/services/solicitud-services";

// Slices
import { fetchData as fetchGetSolicitudById } from "@/store/features/get_one_information";

// TODO: Custom hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

//FIXME:Icons
import AnyIcon from "@/icons/delito.svg?component";
import InvestigacionIcon from '@icons/investigacion.svg?component'
import ZonaIcon from '@/icons/zona.svg?component'
import { AxiosResponse } from "axios";

// TODO:
interface SolicitudAddStatus extends SolicitudAction {
  status: string;
}

type Item = {
  id: number;
  text: string;
};




const ViewSolicitudes = () => {
  // Hooks Redux
  const dispatch = useAppDispatch();
  const solicitudSelector = useAppSelector((state) => state.solicitud);

  // TODO: Custom Hooks
  const { getItem } = useLocalStorage();

  const [Loading, setLoading] = useState<boolean>(false);
  const [Search, setSearch] = useState("");

  const [Value, setValue] = useState<string[]>([]);
  const [OpenTag, setOpenTag] = useState<boolean>(false);
  const [SearchValue, setSearchValue] = useState<string>('')
  // States component Table
  const [Data, setData] = useState([]);
  const [PageCount, setPageCount] = useState<number>(0);
  const [nDocuments, setnDocuments] = useState<number | null>(null);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const [DataSolicitud, setDataSolicitud] = useState<SolicitudAddStatus>({
    status: "initial",
    caso: "",
    nombre_fiscal:'',
    nombre_fiscalia:"",
    fecha: new Date(),
    celulares_solicitados: [],
    delito: "",
    evento: "",
    hora: "",
    organizacion_delicuencial: "",
    plataforma: "",
    solicitante_result: [],
    ubicaciones_celulares: [],
  });

  // Hooks Effects
  useEffect(() => {
    setDataSolicitud(solicitudSelector);
  }, [solicitudSelector]);

  useEffect(() => {
    // Execute function async
    if (Data.length == 0) {
      fetchDataApi(0, 5);
    }
    return () => {};
  }, [Data]);

  const fetchDataApi = async (skip: number, limit: number) => {
    const token_ = JSON.parse(getItem("authToken"));
    try {
      const data = await getPaginateSolicitudes(
        skip,
        limit,
        token_?.accessToken
      );
      setData(data?.data);
      setnDocuments(data?.n_documents);
      let calculo_: number = data?.n_documents / limit;
      let math_ = Math.ceil(calculo_);
      setTotalPages(math_);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = useCallback(
    (skip: number, limit: number) => {
      fetchDataApi(skip, limit);
    },
    [Search]
  );

  const showOneDataSolicitud = (id: string) => {
    console.log(id);
  };

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleGetSolicitudById = (id: string) => {
    const token = getItem("authToken");
    const token_ = JSON.parse(token);
    dispatch(fetchGetSolicitudById({ id, token: token_?.accessToken }));
    handleModal();
  };

  const formatResult = (item: Item) => {
    return <span>{item.text}</span>;
  };

  const handleOnSearch = (string: string, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results)
  };

  const handleClickSearch = async () => {
    let response;
    if(Value.length > 0) {
      let tagSearch = Value[0]
      console.log(tagSearch)
      if(tagSearch == 'caso'){
        response = await searchSolicitudByCaso(SearchValue,'')
        console.log(response.data)
      }
      if(tagSearch == 'investigacion previa'){
        response = await searchSolicitudByIp(SearchValue,'')
        console.log(response.data)
      }
      if (tagSearch == 'zona'){ 
        response = await searchSolicitudByZona(SearchValue,'')
        console.log(response.data)
      }
    }
  }



  const fetchDataApiCases = async (cases:string,stringQuery:string) => {
    let response:AxiosResponse
    try {
      const token_ = JSON.parse(getItem("authToken"));
      if(cases == "CASO"){
        response = await searchSolicitudByCaso(stringQuery,'')
        console.log(response.data)
      }
      if(cases == 'IP'){
        response = await searchSolicitudByIp(stringQuery,'')
        console.log(response.data)
      }
    } catch (erorr) {
      return null
    }
  }

  const fetchDataSearchCallback = useCallback(async (cases:string,stringQuery:string) => {
      fetchDataApiCases(cases,stringQuery)
  },[])

  return (
    <>
      <Modal
        data={DataSolicitud}
        isOpen={OpenModal}
        onClose={handleModal}
        status={solicitudSelector.status}
      />
      <TagInput
        value={Value}
        open={OpenTag}
        onChange={(newValue) => setValue(newValue)}
        onChangeInput={(valueNew) => setSearchValue(valueNew)}
        onClickSearch={handleClickSearch}
        onOpen={() => setOpenTag((prev) => !prev)}
        options={[
          {
            icon: <AnyIcon className="h-5 w-5" />,
            id: "0",
            value: "caso",
          },
          {
            icon: <ZonaIcon className="h-5 w-5" />,
            id: "1",
            value: "zona",
          },
          {
            icon: <InvestigacionIcon className="h-5 w-5" />,
            id: "2",
            value: "investigacion previa",
          },
          {
            icon: <InvestigacionIcon className="h-5 w-5" />,
            id: "3",
            value: "unidad",
          },
          {
            icon: <InvestigacionIcon className="h-5 w-5" />,
            id: "4",
            value: "GDO",
          },
        ]}
        placeholder="Enter a new tag"
      />
      {/* <AutoCompleteSearch 
                items={[
                    {
                        id:1,
                        text: 'test'
                    },{
                        id:2,
                        text: 'caso'
                    },{
                        id:3,
                        text: 'caso val 2'
                    },{
                        id:4,
                        text: 'caso val 3'
                    }
                ]}
                formatResult={formatResult}
                onSearch={handleOnSearch}
                placeholder='Search'
            />     */}
      <TableComponent
        totalPage={TotalPages}
        handleGetSolicitud={handleGetSolicitudById}
        handleModal={handleModal}
        showOneDataSolicitud={showOneDataSolicitud}
        data={Data}
        loading={Loading}
        pageCount={PageCount}
        setPageCount={setPageCount}
        fetch_data={fetchData}
      />
    </>
  );
};

export default ViewSolicitudes;

