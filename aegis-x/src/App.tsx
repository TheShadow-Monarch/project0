import { useState } from 'react'
import TerminalBoot from './components/TerminalBoot'
import Layout from './components/Layout'
import Nexus from './components/Nexus'
import OperationsHub from './components/OperationsHub'
import Vanguard from './components/Vanguard'
import ThreatAnalyzer from './components/ThreatAnalyzer'

function App() {
  const [booting, setBooting] = useState(true);
  const [activeModule, setActiveModule] = useState('nexus');

  if (booting) {
    return <TerminalBoot onComplete={() => setBooting(false)} />
  }

  return (
    <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
      {activeModule === 'nexus' && <Nexus setActiveModule={setActiveModule} />}
      {activeModule === 'operations' && <OperationsHub />}
      {activeModule === 'vanguard' && <Vanguard />}
      {activeModule === 'analyzer' && <ThreatAnalyzer />}
    </Layout>
  )
}

export default App
