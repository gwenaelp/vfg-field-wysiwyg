<template>
  <node-view-wrapper class="file-preview">
    <div>
      <a class="button is-small" @click="modalOpened = true">
        <i class="mdi mdi-pencil" />
      </a>
      <span>
        <a v-if="formModel && formModel.file" @click="openFile(formModel.file)">
          {{formModel.file.originalname}}
        </a>
        <i v-else>
          Pas de fichier sélectionné
        </i>
      </span>
      <Modal :active="modalOpened" @close="modalOpened = false">
        <Form :schema="schema" :model="formModel" @model-updated="modalOpened = false">
          Ajouter un fichier
        </Form>
      </Modal>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import Modal from '@/components/modals/Modal';
import Form from '@/components/Form';
import axios from 'axios';

export default {
  components: {
    NodeViewWrapper,
    Modal,
    Form,
  },

  props: nodeViewProps,

  data () {
    return {
      schema: {
        fields: [{
          type: 'document',
          relation: {
            collection: 'system_files',
            type: 'hasOne',
          },
          onlyFields: [
            'originalname'
          ],
          search: true,
          labelField: 'originalname',
          schemaName: 'file',
          model: 'file'
        }]
      },
      modalOpened: false,
    };
  },
  computed: {
    formModel: {
      get() {
        if(this.node.attrs.file) {
          try {
            return {file: JSON.parse(this.node.attrs.file) };
          } catch (e) {}
        }
        return {};
      },
      set(v) {
        this.node.attrs.file = JSON.stringify(v.file);
      },
    },
  },
  methods: {
    openFile (file) {
      const baseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3332';
      axios({
        url: `${baseUrl}/system_files/${file._id}/file`,
        method: 'GET',
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Token ${this.$store.state.login.user.token}`,
        },
      }).then((response) => {
        if (response.data && response.data.success === false) {
          this.fileDownloadError();
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.originalname);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }).catch((e) => {
        this.fileDownloadError();
      });
    },
  },
}
</script>

<style scoped>
.file-preview {
  color:  black;
}
.file-preview:hover {
  background: whitesmoke;
}
</style>
