import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import JSZip from 'jszip'

interface IState {
  presentation: string
  results: IResult[]
  loadingStatus: 'init' | 'error' | 'loading' | 'success'
}

interface IResult {
  url: string
  type: string
  isSelected: boolean
}

export const useResultsStore = defineStore('results', {
  state: (): IState => ({
    results: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/FRONT3X-Logo.png',
        type: 'Текст',
        isSelected: true
      },
      {
        url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
        type: 'Текст',
        isSelected: true
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/FRONT3X-Logo.png',
        type: 'Текст',
        isSelected: true
      },
      {
        url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
        type: 'Текст',
        isSelected: true
      },
      {
        url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
        type: 'Текст',
        isSelected: true
      }
    ],
    loadingStatus: 'init',
    presentation: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx'
  }),
  actions: {
    async generateImages(input: string, types: string[]) {
      this.loadingStatus = 'loading'
      try {
        const res = await axios.post('http://localhost:8085/generate', {})

        if (res.data) {
          this.results = res.data.images
          this.loadingStatus = 'success'
        }
      } catch (e) {
        console.log(e)
        this.loadingStatus = 'error'
      } finally {
        this.loadingStatus = 'init'
      }
    },
    async downloadZipFiles(ext: string) {
      const zip = new JSZip()
      try {
        for (const [index, result] of this.results.entries()) {
          if (result.isSelected) {
            const res = await this.getBinaryFromUrl(result.url)
            zip.file(`${result.type}-${index}.${ext}`, res)
          }
        }
        await zip.generateAsync({ type: 'blob' }).then((content) => {
          const url = window.URL.createObjectURL(content)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'images.zip')
          document.body.appendChild(link)
          link.click()
        })
      } catch (e) {}
    },
    async downloadPptx() {
      const link = document.createElement('a')
      link.href = this.presentation
      link.setAttribute('download', 'presentation.pptx')
      link.click()
    },
    async getBinaryFromUrl(url: string) {
      const data = await fetch(url)
      const blob = await data.blob()
      return blob
    }
  }
})
