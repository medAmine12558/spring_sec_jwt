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
  ResponsiveContainer
} from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAxiosInstance } from './hook/AxiosHook';


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [year,setYear]=useState('2025');
  const [emotion_statistics_date,setEmotion_statistics_date]=useState([])
  const axiosInstance = useAxiosInstance();
  const [evenements,setEvenements]=useState([])
  const [evenement_id,setEvenement_id]=useState(0)
  const [evenement_statistics,setEvenement_statistics]=useState([])

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
    const getEvenements = async () => {
      const res = await axiosInstance.get("/evenement/AllEvenements");
      setEvenements(res.data)
      setEvenement_id(res.data[0].id)
      
    }
    getEvenements()
    },[]
  )

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

  if(!evenements){
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
          onChange={(e)=>{setEvenement_id(e.target.value)}}
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
  


  const conversionData = [
    { name: 'Visites', value: 1000 },
    { name: 'Inscriptions', value: 300 },
    { name: 'Achats', value: 150 }
  ];

  //ajuster la structure de la reponse de mon api pour qu'il soit asemble a cette structure

  const sessionData = [
    { heure: '00h', sessions: 120 },
    { heure: '04h', sessions: 80 },
    { heure: '08h', sessions: 400 },
    { heure: '12h', sessions: 600 },
    { heure: '16h', sessions: 500 },
    { heure: '20h', sessions: 300 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Navigation */}
        <nav className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activité des utilisateurs */}
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


            {/* Taux de conversion */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Taux de Conversion</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* emotion_statistics_date */}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sessions par Heure</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="heure" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
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