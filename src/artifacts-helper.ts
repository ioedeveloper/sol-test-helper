import { CompilationResult } from '@remix-project/remix-solidity'
import * as fs from 'fs/promises'
import * as path from 'path'

declare global {
    var remixContractArtifactsPath: string
}

export async function getArtifactsByContractName (contractIdentifier: string) {
  const contractArtifacts = await fs.readdir(global.remixContractArtifactsPath)
  let contract

  for (const artifactFile of contractArtifacts) {
    const artifact = await fs.readFile(path.join(global.remixContractArtifactsPath, artifactFile), 'utf-8')
    const artifactJSON: CompilationResult = JSON.parse(artifact)
    const contractFullPath = (Object.keys(artifactJSON.contracts!)).find((contractName) => artifactJSON.contracts![contractName] && artifactJSON.contracts![contractName][contractIdentifier])
    
    contract = contractFullPath ? artifactJSON.contracts![contractFullPath!][contractIdentifier] : undefined
    if (contract) break
  }
  return contract
}
