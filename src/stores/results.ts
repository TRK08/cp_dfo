import { defineStore } from 'pinia'
import axios from 'axios'
import JSZip from 'jszip'
import { TYPES_DICT } from '@/dicts'

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
    // presentation: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx',
    //   results: [
    //     {
    //       url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/FRONT3X-Logo.png',
    //       type: 'InfoBoards',
    //       isSelected: true
    //     },
    //     {
    //       url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
    //       type: 'DemoSystems',
    //       isSelected: true
    //     },
    //     {
    //       url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/FRONT3X-Logo.png',
    //       type: 'LockScreens',
    //       isSelected: true
    //     },
    //     {
    //       url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
    //       type: 'IntranetPortal',
    //       isSelected: true
    //     },
    //     {
    //       url: 'https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg',
    //       type: 'NewsDigest',
    //       isSelected: true
    //     }
    //   ],
    presentation: '',
    results: [],
    loadingStatus: 'init'
  }),
  actions: {
    async generateImages(input: string, types: Record<string, boolean>) {
      this.loadingStatus = 'loading'
      try {
        const res = await axios.post('http://localhost:8085/api/generate_slide', {
          text: input,
          formats: types
        })

        if (res.data) {
          this.results = res.data.images.map((item: IResult) => {
            return {
              ...item,
              isSelected: false
            }
          })
          this.loadingStatus = 'success'
        }
      } catch (e) {
        console.log(e)
        this.loadingStatus = 'error'
      } finally {
        setTimeout(() => {
          this.loadingStatus = 'init'
        }, 500)
      }
    },
    async downloadZipFiles(ext: string) {
      const zip = new JSZip()
      try {
        for (const result of this.results) {
          if (result.isSelected) {
            const res = await this.getBinaryFromUrl(result.url)
            zip.file(`${TYPES_DICT[result.type]}.${ext}`, res)
          }
        }
        await zip.generateAsync({ type: 'blob' }).then((content) => {
          const url = window.URL.createObjectURL(content)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'images.zip')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
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
