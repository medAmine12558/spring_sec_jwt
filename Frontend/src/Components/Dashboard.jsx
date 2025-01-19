import React, { useEffect, useState } from 'react';
import { 
  Home,
  Users, 
  Activity, 
  Settings, 
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAxiosInstance } from './hook/AxiosHook';
import Checkbox from './uicomponents/Checkbox';
import { jwtDecode } from 'jwt-decode';


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [year,setYear]=useState('2025');
  const [emotion_statistics_date,setEmotion_statistics_date]=useState([])
  const axiosInstance = useAxiosInstance();
  const [evenements,setEvenements]=useState([])
  const [evenement_id,setEvenement_id]=useState(0)
  const [evenement_statistics,setEvenement_statistics]=useState([])
  const [evenement_statistics_porcentage,setEvenement_statistics_porcentage]=useState([])
  const [event_description,setEvent_description]=useState("Les évènements de service communautaire")
  const [nbr_emotions_per_year,setNbr_emotions_per_year]=useState([])
  const [name,setName]=useState("")

  //ces couleurs est pour coloer chaque partie de prediction dans la section de statistique en pourcentage 
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  //ici je recupere les statistique des prediction par rapport a l'année selectionner et j'ai afficher ces resultat dans la section de statistique par rapport a l'année
  useEffect(()=>{
    axiosInstance.get("/pred/statisticDate",{params: {
      annee: year
    }}).then(res=>{
      setEmotion_statistics_date(res.data)
      console.log(emotion_statistics_date)
    }).catch(e=>{
      console.error("Erreur lors de la récupération des statistiques :", e.response ? e.response.data : e.message);
    })
    
  },[year,axiosInstance])


   useEffect(()=>{
      const token = sessionStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token)
        setName(decoded.full_name)
        }
    
    },[])

  //ici je recupere les evenements pour les afficher dans une liste ordonner et pour choisir l'evenement sur le quel on veut afficher les statistique des prediction dans cet evenement
  useEffect(()=>{
    const getEvenements = async () => {
      const res = await axiosInstance.get("/evenement/AllEvenements");
      setEvenements(res.data)
      setEvenement_id(res.data[0].id)
      
    }
    getEvenements()
    },[]
  )

  console.log(evenements)
  //ici je recupere les statistique des prediction par rapport a l'evenement selectionner et j'ai afficher ces resultat dans la section de statistique par rapport a l'evenement
  useEffect(()=>{
      axiosInstance.get("/pred/statisticEvenement",{
      params: {
        id_event: evenement_id
      }
    })
    .then(res=>{
      setEvenement_statistics(res.data)
    }).catch(e=>{
      console.error("Erreur lors de la récupération des statistiques :", e.response ? e.response.data : e.message);
    })
  },[evenement_id])

  const totale=evenement_statistics.reduce((sum,item)=>sum+parseInt(item.number),0);

  //ici je calcule le pourcentage de chaque prediction par rapport au totale des prediction
  useEffect(()=>{
    setEvenement_statistics_porcentage(evenement_statistics.map(item=>({
      ...item, 
      number: Number((((parseInt(item.number,10))/totale)*100).toFixed(2)),
    })))
   
  },[evenement_statistics])

  //ici je fait appel a un api qui me retourn le nombre des emotion de chaque annee
  useEffect(()=>{
    axiosInstance.get("/pred/statisticAllYears").then(res=>{
      setNbr_emotions_per_year(res.data);
    }).catch(e=>{
      console.error("Erreur lors de la récupération des statistiques :", e.response ? e.response.data : e.message);
    });

  },[])

  useEffect(()=>{
    console.log(nbr_emotions_per_year)
  },[nbr_emotions_per_year])





  if(!evenements || !emotion_statistics_date || !evenement_statistics){
    return <div>loading...</div>

  }

    //fonction pour afficher une liste ordonner pour choisir l'evenement sur le quel on veut afficher les statistique des prediction dans cet evenement

  const valueofevents = () => {
    return(
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={evenement_id}
          label="evenements"
          onChange={(e)=>{
            console.log(e.target.value)
            setEvenement_id(e.target.value) ;
            evenements.map((event, index) => {
              if(event.id===e.target.value){
                setEvent_description(event.description)}
            })
            //setEvent_description(e.target.value.desc);
          }}
        >
          {evenements.map((event, index) => (
            <MenuItem key={index} value={event.id}>{event.description}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    )
  }

  //fonction pour afficher une liste ordonner pour choisir l'annee sur la quelle on veut afficher les statistique des prediction dans cette annee
  const valueofyears = () => {
   
    return(
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="year"
          onChange={(e)=>{setYear(e.target.value)}}
        >
          <MenuItem value={"2020"}>2020</MenuItem>
          <MenuItem value={"2021"}>2021</MenuItem>
          <MenuItem value={"2022"}>2022</MenuItem>
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2024"}>2024</MenuItem>
          <MenuItem value={"2025"}>2025</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
  }

  

  return (
    <div style={{marginLeft:"0px"}} className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-xl h-screen fixed left-0 top-0 z-20 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {[
            { icon: Home, label: 'Dashboard', active: true },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
                item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
          
          <button className="flex items-center w-full p-3 mt-auto text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={isSidebarOpen ? {marginLeft:"160px"} : null} className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Navigation */}
        <nav className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Checkbox className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {name.charAt(0)}
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* statistique par rapport a l'evenement */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">evenements :  {valueofevents()}</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={evenement_statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="emotion" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="number" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>


            {/* statistique en pourcentage par rapport a l'evenement  */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pourcentage du chaque emotion par rapport a l'evenement "{event_description}"</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={evenement_statistics_porcentage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      nameKey="emotion"
                      dataKey="number"
                      label="%"
                    >
                      
                      {/*colorer chaque partie de prediction*/}
                      {evenement_statistics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* statistique par rapport a l'année*/}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Year :  {valueofyears()}</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emotion_statistics_date}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="emotion" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="prediction" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Évolution des Émotions</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={nbr_emotions_per_year}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="happy" 
              stroke="#10b981" 
              strokeWidth={2} 
              name="happy"
            />
            <Line 
              type="monotone" 
              dataKey="sad" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              name="sad"
            />
            <Line 
              type="monotone" 
              dataKey="angry" 
              stroke="#ef4444" 
              strokeWidth={2} 
              name="angrey"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
          </div>
        </main>
      </div>
    </div>
  );
};